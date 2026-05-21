#!/bin/bash
set -e

# Ensure the /var/lib/mysql directory exists
mkdir -p /var/lib/mysql

HASH_FILE="/var/lib/mysql/.init_script_hash"
CURRENT_HASH=$(md5sum /docker-entrypoint-initdb.d/smxchange_db.sql | awk '{ print $1 }')

if [ -f "$HASH_FILE" ]; then
  OLD_HASH=$(cat "$HASH_FILE")
  if [ "$CURRENT_HASH" != "$OLD_HASH" ]; then
    echo "=========================================================="
    echo "⚠️ CHANGES DETECTED IN smxchange_db.sql!"
    echo "🧹 Wiping the database volume to apply new schema..."
    echo "=========================================================="
    
    # Delete everything in the volume except the hash file
    find /var/lib/mysql -mindepth 1 -maxdepth 1 ! -name '.init_script_hash' -exec rm -rf {} +
    
    echo "$CURRENT_HASH" > "$HASH_FILE"
  else
    echo "✅ No changes detected in DB init script. Preserving volume."
  fi
else
  echo "🆕 First time initialization or hash missing. Saving hash..."
  echo "$CURRENT_HASH" > "$HASH_FILE"
fi

# Pass control back to the official MySQL entrypoint
exec docker-entrypoint.sh "$@"
