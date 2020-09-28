FROM rustlang/rust:nightly

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000

ARG CRAWL_URL

WORKDIR /usr/src/app

COPY Cargo.toml ./
COPY Cargo.lock ./
COPY /src/main.rs ./src/main.rs
COPY rust-toolchain ./rust-toolchain

COPY . .

# ignore cargo build step due to run auto build
RUN cargo build --release

CMD [ "./target/release/a11y-watcher"]


