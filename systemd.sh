#!/bin/bash
echo "get the home directory of user"
echo ~csye6225

echo "display permissions of user directory"
ls -la /opt/csye6225

echo "change permissions of webapp"
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 750  /opt/csye6225/webapp

echo "display permissions of user directory"
ls -la /opt/csye6225

sudo -u csye6225 bash

cd 
sudo systemctl start webapp
sudo systemctl restart webapp
sudo systemctl status webapp
sudo systemctl enable webapp
