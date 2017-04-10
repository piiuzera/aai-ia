#!/bin/bash

#Update permission
echo '---------------------------------------------'
echo 'Update permissions and clear dependencies:'
sudo chown -R $USER /usr/local/
rm -R ./node_modules/
echo 'Done!'
echo ''

#Clear npm dependencies
echo '---------------------------------------------'
echo 'Clear npm dependencies:'
sudo npm cache clean
echo 'Done!'
echo ''

#Install npm dependencies
echo '---------------------------------------------'
echo 'Install npm dependencies:'
echo ''

#Install Pm2
echo 'Install pm2:'
sudo npm install pm2 -g --unsafe-perm
echo 'Done!'

#Install minimatch
echo 'Install dependencies:'
npm install
echo 'Done!'
echo ''

#Install npm dependencies
echo '---------------------------------------------'
echo 'Update npm dependencies:'
npm update
echo 'Done!'
echo ''

#Install NVM
echo '---------------------------------------------'
echo 'Download NVM:'
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
echo 'Config NVM:'
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
echo 'Instal NVM NODE:'
nvm install node
nvm install 6.6.0
echo 'Done!'
echo ''

#Install bower dependencies
echo '---------------------------------------------'
echo 'Start Project:'
./start.sh
echo 'Done!'
echo ''
