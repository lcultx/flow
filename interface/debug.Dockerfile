
# http://os.51cto.com/art/201507/487057_all.htm
# https://segmentfault.com/a/1190000008945039

#docker 
# http://blog.csdn.net/weixin_36806758/article/details/53318261

#docker compose
# https://www.cnblogs.com/neptunemoon/p/6512121.html

# node-gyp依赖python环境
FROM gastrodia/python


WORKDIR /container

# # 安装npm模块
ADD ./package.json /container/package.json
ADD ./package-lock.json /container/package-lock.json
# # 使用淘宝的npm镜像
RUN npm install --registry http://r.cnpmjs.org/


WORKDIR /container/app

# 添加源代码
ADD . /container/app

# 运行app.js
CMD ["node", "main.js"]