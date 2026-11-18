
#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

GOINFRE="$HOME/goinfre"
DEPS_ROOT="$GOINFRE/ft_transcendence-deps"
NPM_CACHE="$DEPS_ROOT/npm-cache"

echo "========== STORAGE BEFORE =========="
df -h "$HOME" "$GOINFRE"

# Check required tools
command -v node >/dev/null || {
  echo "ERROR: Node.js is not installed"
  exit 1
}

command -v npm >/dev/null || {
  echo "ERROR: npm is not installed"
  exit 1
}

[[ -d "$GOINFRE" && -w "$GOINFRE" ]] || {
  echo "ERROR: ~/goinfre is missing or not writable"
  exit 1
}

mkdir -p "$DEPS_ROOT" "$NPM_CACHE"
export npm_config_cache="$NPM_CACHE"

# Install and link dependencies
setup_dependencies() {
  local name="$1"
  local project="$PROJECT_DIR/$name"
  local deps="$DEPS_ROOT/$name"
  local link="$project/node_modules"
  local backup="$project/node_modules_backup"
  local reinstall=false

  echo
  echo "========== SETTING UP $name =========="

  # Check package files
  if [[ ! -f "$project/package.json" ||
        ! -f "$project/package-lock.json" ]]; then
    echo "ERROR: Missing package files in $project"
    return 1
  fi

  mkdir -p "$deps"

  # Check whether dependencies need reinstalling
  if [[ ! -d "$deps/node_modules" ]] ||
     ! cmp -s "$project/package.json" "$deps/package.json" ||
     ! cmp -s "$project/package-lock.json" "$deps/package-lock.json"; then
    reinstall=true
  fi

  if [[ "$reinstall" == true ]]; then
    echo "Installing dependencies for $name..."

    cp "$project/package.json" "$deps/package.json"
    cp "$project/package-lock.json" "$deps/package-lock.json"

    (
      cd "$deps"
      npm ci --no-fund
    )
  else
    echo "Dependencies unchanged. Skipping installation."
  fi

  # Handle an existing node_modules directory
  if [[ -L "$link" ]]; then
    if [[ "$(readlink -f "$link")" != \
          "$(readlink -f "$deps/node_modules")" ]]; then
      echo "ERROR: Existing symlink points elsewhere: $link"
      return 1
    fi

    echo "Correct symlink already exists."

  elif [[ -e "$link" ]]; then
    # Do not overwrite an existing backup
    if [[ -e "$backup" || -L "$backup" ]]; then
      echo "ERROR: Backup already exists: $backup"
      echo "Please review it before continuing."
      return 1
    fi

    echo "Moving existing node_modules to backup..."
    mv "$link" "$backup"

    echo "Creating symbolic link..."
    ln -s "$deps/node_modules" "$link"

  else
    echo "Creating symbolic link..."
    ln -s "$deps/node_modules" "$link"
  fi

  echo "$name dependencies ready!"
  ls -ld "$link"
}

# ========== FRONTEND ==========
if [[ -f "$PROJECT_DIR/frontend/package.json" ]]; then
  setup_dependencies "frontend"
else
  echo "WARNING: Frontend not found. Skipping."
fi

# ========== BACKEND SERVICES ==========
echo
echo "========== FINDING BACKEND SERVICES =========="

if [[ -d "$PROJECT_DIR/services" ]]; then
  for service in "$PROJECT_DIR"/services/*/; do
    [[ -d "$service" ]] || continue
    [[ -f "$service/package.json" ]] || continue

    service_name="$(basename "$service")"

    setup_dependencies "services/$service_name"
  done
else
  echo "WARNING: services/ directory not found."
fi

# ========== STORAGE ==========
echo
echo "========== DEPENDENCY SIZES =========="

du -sh "$DEPS_ROOT/frontend" \
       "$DEPS_ROOT/services/"* \
       "$NPM_CACHE" 2>/dev/null || true

echo
echo "========== STORAGE AFTER =========="
df -h "$HOME" "$GOINFRE"

echo
echo "========== SETUP COMPLETE =========="
echo "All dependencies are linked to:"
echo "$DEPS_ROOT"
echo
echo "Existing node_modules folders were backed up when needed."
echo "Review backups before deleting them."

