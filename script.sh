#!/bin/bash

sudo yum update

echo "Installing npm..."
sudo yum install nodejs npm -y

sudo yum update

sudo yum -y install @mysql
sudo systemctl start mysqld.service
sudo systemctl enable mysqld

sudo yum update

sudo yum install unzip -y

echo "MySQL and npm installation completed."

sudo groupadd csye6225
sudo useradd -g csye6225 -d /opt/csye6225 -s /usr/sbin/nologin csye6225

sudo yum install unzip

sudo -u csye6225 bash

sudo chown -R csye6225:csye6225 /opt/csye6225
sudo chmod -R 750  /opt/csye6225

sudo cp -r  webapp.zip /opt/csye6225

cd /opt/csye6225
sudo unzip webapp.zip

cd webapp
sudo npm install --build-from-source

