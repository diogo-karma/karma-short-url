#!/bin/bash

# Carregar variáveis do arquivo .env
set -a
source .env
set +a

mkdir -p ./backups
cd ./backups

redis-cli --rdb "backup_redis_$(date +%Y%m%d%H%M%S).rdb"

ls -l backup_redis_*

echo "OK"