# FROM egovio/alpine-node-builder-14:yarn AS build
FROM ghcr.io/egovernments/alpine-node-builder-14:yarn AS build
RUN apk update && apk upgrade
RUN apk add --no-cache git>2.30.0
ARG WORK_DIR
WORKDIR /app
ENV NODE_OPTIONS "--max-old-space-size=8168"

RUN yarn add @upyog/digit-ui-module-pgr@1.9.0
RUN yarn add @egovernments/digit-ui-module-common
RUN yarn add @egovernments/digit-ui-module-dss@1.8.0
RUN yarn add @egovernments/digit-ui-module-core@1.8.1

COPY ${WORK_DIR} .
RUN ls -lah

#RUN node web/envs.js
RUN cd web/ \
    &&  ./install-deps.sh \
    && yarn install \
    && yarn build:webpack 

FROM nginx:mainline-alpine
#FROM ghcr.io/egovernments/nginx:mainline-alpine
ENV WORK_DIR=/var/web/digit-ui

RUN mkdir -p ${WORK_DIR}

COPY --from=build /app/web/build ${WORK_DIR}/
COPY --from=build /app/web/docker/nginx.conf /etc/nginx/conf.d/default.conf
