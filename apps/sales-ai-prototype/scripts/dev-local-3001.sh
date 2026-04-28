#!/usr/bin/env bash
# Deprecated: dev now uses port 3000. This wrapper forwards to dev-local.sh.
exec "$(dirname "$0")/dev-local.sh"
