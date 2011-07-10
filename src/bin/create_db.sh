#!/usr/bin/env bash
bin=`dirname "$0"`
bin=`cd "$bin">/dev/null; pwd`

. "$bin/mindmap-config.sh"

mysql -u $DB_USER -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

mysql -u $DB_USER -p"$DB_PASS" -D $DB_NAME -e "source $bin/../sql/create_table.sql"
