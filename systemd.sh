#!/bin/bash
echo "get the home directory of user"
echo ~csye6225

echo "display permissions of user directory"
ls -la /opt/csye6225

echo "change permissions of webapp"
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp-fork
sudo chmod -R 750  /opt/csye6225/webapp-fork

echo "display permissions of user directory"
ls -la /opt/csye6225

sudo -u csye6225 bash

cd /opt/csye6225
sudo systemctl start csye6225
sudo systemctl restart csye6225
sudo systemctl status csye6225
sudo systemctl enable csye6225
