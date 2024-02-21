#!/bin/bash

sudo yum update
sudo yum -y install @mysql
sudo systemctl start mysqld.service
sudo systemctl enable mysqld

echo "Installing npm..."
sudo yum -y install epel-release
sudo yum -y install nodejs npm

sudo yum install -y unzip

echo "MySQL and npm installation completed."

sudo groupadd csye6225
sudo useradd -g csye6225 -d /opt/csye6225 -s /usr/sbin/nologin csye6225

sudo yum install unzip

sudo cp -r  webapp.zip /opt/csye6225

sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 750  /opt/csye6225/webapp

sudo -u csye6225 bash

cd /opt/csye6225
sudo unzip webapp.zip

cd webapp
sudo npm install

