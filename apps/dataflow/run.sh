#! /bin/bash
cd /data/source/interface
#npm install --registry=http://registry.npm.taobao.org
#npm run build
export PORT=5008 && source /etc/profile && pm2 start index.js --name dataflow
pm2 logs dataflow