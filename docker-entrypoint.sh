#!/bin/sh
set -eu

cd /app


# Normalize truthy/falsey env flags (Swarm/CI may pass "false", "0", "no", etc.).
is_truthy() {
  raw="${1-}"
  normalized="$(printf '%s' "$raw" | tr -d '\r\n' | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')"
  case "$normalized" in
    1|true|yes|on|y) return 0 ;;
    *) return 1 ;;
  esac
}

if [ -z "${RUN_MIGRATIONS+x}" ]; then
  run_migrations=true
else
  if is_truthy "$RUN_MIGRATIONS"; then
    run_migrations=true
  else
    run_migrations=false
  fi
fi

if [ "$run_migrations" = true ]; then
  echo "Running database migrations..."
  node scripts/migrate.mjs
else
  echo "Skipping database migrations (RUN_MIGRATIONS=${RUN_MIGRATIONS:-unset})"
fi

if [ -z "${RUN_SEED+x}" ]; then
  run_seed=false
else
  if is_truthy "$RUN_SEED"; then
    run_seed=true
  else
    run_seed=false
  fi
fi

if [ "$run_seed" = true ]; then
  echo "Seeding bootstrap admin user..."
  node scripts/seed.mjs
else
  echo "Skipping seed (RUN_SEED=${RUN_SEED:-unset})"
fi

exec "$@"
