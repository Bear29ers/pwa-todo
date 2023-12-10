FROM node:20.9-buster-slim

ENV TZ Asia/Tokyo

WORKDIR /app

RUN apt-get update \
  && apt-get install -y
