FROM debian
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /usr/src/app

ENV MODE=PRODUCTION

#Mongo Link
ENV MONGO=mongodb+srv://niedson:10-20-30@cluster0.dgppv.mongodb.net/test

EXPOSE 3001

COPY Backend/ /usr/src/app/Backend

RUN apt-get update && apt-get install -y \
    wget \
    build-essential libssl-dev \
    nodejs\
    npm 

RUN npm install -g n \
    && n stable 

RUN npm install pm2 -g

RUN  cd Backend/ \
    && npm install \
    && chmod 777 src/* 

CMD cd Backend/ \
    && pm2-runtime src/index.js