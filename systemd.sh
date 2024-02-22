#!/bin/bash

echo "list all files"
ls -la /opt/csye6225

echo "manage permissions for new user"
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 777  /opt/csye6225/webapp

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
sudo systemctl daemon-reload
sudo systemctl enable csye6225

