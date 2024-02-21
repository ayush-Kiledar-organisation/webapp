#!/bin/bash

sudo yum update
sudo yum -y install @mysql
sudo systemctl -y start mysqld.service
sudo systemctl -y enable mysqld

echo "Installing npm..."
sudo yum -y install epel-release
sudo yum -y install nodejs npm

sudo yum install -y unzip

echo "MySQL and npm installation completed."


sudo useradd -g csye6225 -d /opt/csye6225 -s /usr/sbin/nologin csye6225

sudo yum install unzip

sudo cp -r  webapp.zip /opt/csye6225
cd /opt/csye6225
sudo unzip webapp.zip

cd webapp
sudo npm install

