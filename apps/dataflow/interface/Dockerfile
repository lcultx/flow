# node-gyp依赖python环境
FROM gastrodia/python

WORKDIR /container

# 安装npm模块
ADD package.json /container/package.json

# 使用淘宝的npm镜像
RUN npm install --production -d --registry=http://r.cnpmjs.org/

RUN npm install -g nodemon --registry=http://r.cnpmjs.org/

WORKDIR /container/app

# 添加源代码
ADD . /container/app

# 运行app.js
CMD ["node", "main.js"]