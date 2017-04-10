#!/bin/bash

# Start and watch serve
echo 'Start server...'
echo 'Write your password:'

sudo pm2 delete Chatterbot
sudo pm2 start server.js --name="Chatterbot" --interpreter "$NVM_DIR/versions/node/v6.6.0/bin/node"
sudo pm2 logs Chatterbot
