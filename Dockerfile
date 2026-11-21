# syntax=docker/dockerfile:1
#
# Local development convenience image. CI/CD uses docker/production/Dockerfile,
# which this mirrors with the public Node image.

FROM node:24-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@12.16.1 --activate

# Install dependencies once and reuse across stages.
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --config.supplyChainPolicy=none

# Runtime deps for scripts/migrate.mjs and scripts/seed.mjs (outside the Next bundle).
FROM deps AS script-deps

RUN mkdir -p /out \
  && node -e "const v=(n)=>require('/app/node_modules/'+n+'/package.json').version;require('fs').writeFileSync('/out/package.json',JSON.stringify({private:true,type:'module',dependencies:{'drizzle-orm':v('drizzle-orm'),pg:v('pg'),bcryptjs:v('bcryptjs')}}))" \
  && cd /out && npm install --omit=dev --no-audit --no-fund

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=true
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/originalpal"

RUN pnpm build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs \
  && mkdir -p /app/uploads \
  && chown -R nextjs:nodejs /app/uploads

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Migrations, migrate/seed scripts and their runtime deps.
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder \
  /app/scripts/migrate.mjs \
  /app/scripts/seed.mjs \
  /app/scripts/create-database.mjs \
  /app/scripts/db-diagnostics.mjs \
  ./scripts/
COPY --from=script-deps /out/node_modules ./scripts/node_modules

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
  && chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/login').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
