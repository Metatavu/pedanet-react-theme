#!/bin/bash

cd wp
wp core download
wp core config --dbname=muisti --dbuser=root --dbpass=random --dbhost=127.0.0.1:33060
wp core install --url=http://localhost:1234 --title=mtest --admin_user=admin --admin_password=admin --admin_email=admin@example.com
wp server --port=1234