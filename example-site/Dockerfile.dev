FROM bitnami/minideb AS builder
ENV ZOLA_VERSION v0.10.1
RUN install_packages python-pip curl tar python-setuptools rsync binutils
RUN pip install dockerize

WORKDIR /usr/src/app

RUN curl -L https://github.com/getzola/zola/releases/download/$ZOLA_VERSION/zola-$ZOLA_VERSION-x86_64-unknown-linux-gnu.tar.gz | tar xz
RUN mv zola /usr/bin
RUN dockerize -n --verbose -o /usr/src/app /usr/bin/zola

COPY . .

ENTRYPOINT [ "zola", "serve", "--port", "8050", "--interface", "0.0.0.0" ]