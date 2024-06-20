FROM registry.cn-hangzhou.aliyuncs.com/huhu_school/node_service:base AS build

LABEL maintainer="code@fater.land"

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# FROM node:18-alpine3.18
FROM registry.cn-hangzhou.aliyuncs.com/huhu_school/node_service:base

WORKDIR /app

COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./

RUN apk add --no-cache tzdata

ENV TZ="Asia/Shanghai"

RUN npm install pm2 -g

RUN npm install --production

EXPOSE 10888

ENTRYPOINT ["npm", "run", "online"]
