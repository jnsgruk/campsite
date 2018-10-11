#!/bin/bash
if [ "$EUID" -ne  0 ]
  then echo "Please run as root!"
  exit
fi

CAMPSITE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Install dependencies
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install nodejs nginx-full yarn gpsd

# Generate OpenSSL self-signed certificate for frontend
mkdir -p /etc/nginx/ssl
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=campsite/L=campsite/O=campsite/CN=campsite" -keyout /etc/nginx/ssl/key.pem  -out /etc/nginx/ssl/cert.pem

cd $CAMPSITE_DIR

# Clean up existing installs
systemctl stop campsite
rm -rf /opt/campsite
mkdir -p /opt/campsite

# Copy new files into place
mv ./frontend /opt/campsite/frontend
mv ./campsite.js /opt/campsite/campsite.js
mv ./package.json /opt/campsite/package.json

# Install systemd unit and nginx site
mv ./config/default /etc/nginx/sites-enabled/default
mv ./config/campsite.service /etc/systemd/system/campsite.service

# Install node deps
cd /opt/campsite
yarn

# Reload systemd units and restart
systemctl daemon-reload
systemctl enable gpsd
systemctl restart gpsd
systemctl restart campsite
systemctl restart nginx

# Clean up directory
cd $CAMPSITE_DIR/..
rm -rf $CAMPSITE_DIR