# syntax=docker/dockerfile:1.4

# of-watchdog
FROM ghcr.io/openfaas/of-watchdog:0.9.6 as of-watchdog

# runtime
FROM docker.io/bitnami/node:16 as runtime
ENV \
    upstream_url="http://127.0.0.1:3000"\
    fprocess="node server.js"\
    exec_timeout="0"\
    mode="http"
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
