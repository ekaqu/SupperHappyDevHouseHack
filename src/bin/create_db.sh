#!/usr/bin/env bash
bin=`dirname "$0"`
bin=`cd "$bin">/dev/null; pwd`

. "$bin/mindmap-config.sh"

mysql -u $DB_USER -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

mysql -u $DB_USER -D $DB_NAME -e "source $bin/../sql/create_table.sql"

mysql -u $DB_USER -D $DB_NAME -e "GRANT ALL ON $DB_NAME.* TO '$APP_USER'@'localhost' IDENTIFIED BY '$APP_PASS'"
mysql -u $DB_USER -D $DB_NAME -e "GRANT ALL ON $DB_NAME.* TO '$APP_USER'@'%' IDENTIFIED BY '$APP_PASS'"
