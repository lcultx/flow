FROM basic-registry.skong.com/skong/centos:7
###继承自centos镜像

MAINTAINER waitfish from silence_litx
####创建者信息
ENV PATH /data/data/node-v6.10.2-linux-x64/bin:$PATH
RUN mkdir -pv /data/source
ADD docker_dataflow.tgz /data/source/
#ADD docker_dataflow.tgz /data/source/
COPY run.sh /run.sh
ADD node-v6.10.2-linux-x64.tar.gz /data/
RUN export PORT=5008
RUN chmod +x /run.sh

EXPOSE 5008

CMD ["/run.sh"]