#!/bin/bash
CAMPSITE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install nodejs nginx-full

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

cd $CAMPSITE_DIR/frontend
yarn
yarn run build

# Generate OpenSSL self-signed certificate for frontend
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=campsite/L=campsite/O=campsite/CN=campsite" -keyout /etc/nginx/ssl/key.pem  -out /etc/nginx/ssl/cert.pem

tee /etc/nginx/sites-enabled/default <<-EOF
server {
    listen 80;
    return 301 https://$host$request_uri;
}

server {
        listen 443 default_server;
        listen [::]:443 default_server;
       
        root /opt/campsite/frontend;
        index index.html index.htm;

        server_name _;
        ssl on;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers RC4:HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        keepalive_timeout 60;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        location / { 
                try_files $uri $uri/ /index.html;
        }
        location /api {
                include proxy_params;
                proxy_pass http://127.0.0.1:5000;
        }

        location /socket.io {
                include proxy_params;
                proxy_http_version 1.1;
                proxy_buffering off;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
                proxy_pass http://127.0.0.1:5000/socket.io;
        }
}
EOF

cd $CAMPSITE_DIR/backend
yarn
yarn run rollup

cd $CAMPSITE_DIR

systemctl stop campsite
rm -rf /opt/campsite
mkdir -p /opt/campsite
cp -r ./frontend/build /opt/campsite/frontend
cp ./backend/build/campsite.js /opt/campsite/campsite.js
cp ./backend/package.json /opt/campsite/package.json
cd /opt/campsite
NODE_ENV=production yarn

tee /etc/systemd/system/campsite.service <<-EOF
[Unit]
Description=Campsite
ConditionPathExists=/opt/campsite/campsite.js
After=network.target auditd.service

[Service]
User=root
WorkingDirectory=/opt/campsite
Environment="NODE_ENV=production"
ExecStart=/opt/campsite/campsite.js
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl restart campsite