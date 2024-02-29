#!/bin/bash

echo "list all files"
ls -la /opt/csye6225


echo "manage permissions for new user"
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo mkdir /var/log/csye6225
sudo chown csye6225:csye6225 /var/log/csye6225

echo "list all files"

ls -la /opt/csye6225

echo "change user bash"
sudo -u csye6225 bash


echo "change dir"
cd /opt/csye6225/webapp

echo "checking files"
ls -al

echo "systemd setting"


sudo cp csye6225.service /etc/systemd/system/
sudo chown csye6225:csye6225 /etc/systemd/system/csye6225.service
sudo systemctl daemon-reload
sudo systemctl start csye6225
sudo systemctl enable csye6225
sudo systemctl disable csye6225
sudo systemctl enable csye6225