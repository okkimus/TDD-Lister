FROM ubuntu:22.04

# Install updates
RUN apt update -y && apt upgrade -y

# Install necessary tooling
RUN apt install -y curl wget unzip zip nano sudo

RUN mkdir /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 18.14.0
ENV NVM_INSTALL_PATH $NVM_DIR/versions/node/v$NODE_VERSION
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN sudo adduser --gecos '' --home /home/code code \
    && echo 'source $NVM_DIR/nvm.sh' > /home/code/.bashrc \
    && mkdir /home/code/project
RUN usermod -aG sudo code

RUN apt-get -y install postgresql-client

USER code
WORKDIR /home/code/project

CMD [ "sleep", "infinity" ]