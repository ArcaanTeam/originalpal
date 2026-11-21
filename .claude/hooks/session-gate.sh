#!/bin/sh
# Claude Code Stop hook: end-of-session gate.
# Runs run_gate (below) when the working tree changed since the last passing run.
# On failure, exit 2 hands the output back to Claude to fix; after 3 failed rounds
# it stops blocking and reports instead, so a stuck gate cannot loop forever.
set -u
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
cat >/dev/null # hook input (unused)

git_dir=$(git rev-parse --git-dir 2>/dev/null) || exit 0
state="$git_dir/claude-session-gate"
tree_state() { { git status --porcelain; git diff; } 2>/dev/null | git hash-object --stdin; }

[ -z "$(git status --porcelain 2>/dev/null)" ] && exit 0
[ -f "$state.pass" ] && [ "$(cat "$state.pass")" = "$(tree_state)" ] && exit 0

# Files changed vs HEAD plus untracked files (deleted files excluded).
changed_files() {
  { git diff --name-only --diff-filter=d HEAD; git ls-files --others --exclude-standard; } 2>/dev/null | sort -u
}

# Full gate when JS/TS changed; format-only when every changed file is CSS/HTML/JSON/Markdown/etc.
run_gate() {
  if changed_files | grep -qE '\.(ts|tsx|js|jsx|mjs|cjs)$'; then
    pnpm format:changed && pnpm lint && pnpm typecheck
  else
    pnpm format:changed
  fi
}

if out=$(run_gate 2>&1); then
  # Formatters may have rewritten files: remember the tree as it is after the gate.
  tree_state >"$state.pass"
  rm -f "$state.tries"
  exit 0
fi

tries=$(($(cat "$state.tries" 2>/dev/null || echo 0) + 1))
if [ "$tries" -gt 3 ]; then
  rm -f "$state.tries"
  printf 'Session gate still failing after 3 rounds; not blocking again. Last output:\n%s\n' \
    "$(printf '%s\n' "$out" | tail -40)" >&2
  exit 1
fi
echo "$tries" >"$state.tries"
printf 'Session gate failed (round %s/3). Fix these before finishing:\n%s\n' \
  "$tries" "$(printf '%s\n' "$out" | tail -60)" >&2
exit 2
