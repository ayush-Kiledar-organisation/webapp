#!/bin/bash

sudo yum update


echo "installing node and npm"

sudo yum install -y nodejs gcc-c++ make
sudo dnf module -y reset nodejs
sudo dnf module -y enable nodejs:16

sudo yum update

echo "installing mysql and creating the db"
sudo yum -y install @mysql
sudo systemctl start mysqld.service
sudo systemctl enable mysqld
mysql -u root -p'' -e "CREATE DATABASE cloud_assignment_db;"

sudo yum update

sudo yum install unzip -y

echo "add user and group"
sudo groupadd csye6225
sudo useradd -g csye6225 -d /opt/csye6225 -s /usr/sbin/nologin csye6225

sudo yum install unzip

sudo cp -r  webapp.zip /opt/csye6225


sudo -u csye6225 bash

echo "managed permissions for new user"
sudo chown -R csye6225:csye6225 /opt/csye6225
sudo chmod -R 750  /opt/csye6225

sudo -u csye6225 bash

sudo chmod o+rx /opt/csye6225


cd /opt/csye6225
sudo unzip webapp.zip

cd /opt/csye6225/webapp
sudo yum remove nodejs
sudo yum install -y nodejs gcc-c++ make
sudo dnf module -y reset nodejs
sudo dnf module -y enable nodejs:16
sudo npm install
