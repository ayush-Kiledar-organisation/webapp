#!/bin/bash
echo "get the home directory of user"
echo ~csye6225

echo "display permissions of user directory"
ls -la /opt/csye6225

echo "change permissions of webapp"
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 777  /opt/csye6225/webapp
ls -la /opt/csye6225

sudo -u csye6225 bash

cd /opt/csye6225/webapp

echo "checking files for error"
ls -al

sudo cp csye6225.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable csye6225