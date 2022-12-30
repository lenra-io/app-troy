# syntax=docker/dockerfile:1.4

# of-watchdog
FROM ghcr.io/openfaas/of-watchdog:0.9.6 as of-watchdog

# runtime
FROM docker.io/bitnami/node:16 as runtime
ENV \
    exec_timeout="0"\
    upstream_url="http://127.0.0.1:3000"\
    mode="http"\
    fprocess="node server.js"
WORKDIR /app
ADD --link . ./
COPY --link --chown=1000:1000 --from=of-watchdog "/fwatchdog" "/fwatchdog"
USER 0
RUN \
    chown -R 1000 /app
USER 1000
RUN \
    npm i --omit=dev
EXPOSE 8080
CMD ["/fwatchdog"]
