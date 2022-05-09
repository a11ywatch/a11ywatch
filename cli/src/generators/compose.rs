/// generate central backend services
pub fn generate_compose_backend() -> &'static str {
    &r#"
version: '3.9'
services:
  api:
    container_name: api
    image: a11ywatch/a11ywatch-core
    ports:
      - 3280:8080
      - 50051
    depends_on:
      - mongodb
    environment:
      - DB_URL=${DB_URL:-mongodb://mongodb:27017/?compressors=zlib&gssapiServiceName=mongodb}
      - DB_NAME=${DB_NAME:-a11ywatch}
      - APOLLO_GRAPH_VARIANT=${APOLLO_GRAPH_VARIANT:-current}
      - APOLLO_SCHEMA_REPORTING=${APOLLO_SCHEMA_REPORTING:-false}
      - CLIENT_URL=${CLIENT_URL:-http://localhost:3000}
      - WATCHER_CLIENT_URL=${WATCHER_CLIENT_URL:-http://crawler:8000}
      - GRAPHQL_PORT=${GRAPHQL_PORT:-8080}
      - SCRIPTS_CDN_URL=${SCRIPTS_CDN_URL:-http://localhost:8090/api}
      - PUPPET_SERVICE=${PUPPET_SERVICE:-http://pagemind:8040}
      - ROOT_URL=${ROOT_URL:-http://localhost:8080}
      - MAV_CLIENT_URL=${MAV_CLIENT_URL:-http://127.0.0.1:8020}
      - BACKGROUND_CRAWL=${BACKGROUND_CRAWL:-true}
      - REDIS_CLIENT=${REDIS_CLIENT:-redis://redis:6379}
      - REDIS_HOST=redis
      - DOCKER_ENV=true
      - SUPER_MODE=${SUPER_MODE:-true}

  pagemind:
    container_name: pagemind
    image: a11ywatch/pagemind
    ports:
      - 8040
      - 50052
    environment:
      - SCRIPTS_CDN_URL=${SCRIPTS_CDN_URL:-http://127.0.0.1:8090/api}
      - SCRIPTS_CDN_URL_HOST=${SCRIPTS_CDN_URL_HOST:-http://localhost:8090/cdn}
      - AI_SERVICE_URL=${SCRIPTS_CDN_URL:-http://127.0.0.1:8020}
      - PORT=${PAGEMIND_PORT:-8040}

  mav:
    container_name: mav
    image: a11ywatch/mav
    ports:
      - 8020
      - 50053
    environment:
      - MAIN_API_URL=${MAIN_API_URL:-http://127.0.0.1:8080}
      - PORT=${MAV_PORT:-8020}
      - DOCKER_ENV=true

  cdn-server:
    container_name: cdn-server
    image: a11ywatch/cdn-server
    ports:
      - 8090:8090
      - 50054
    environment:
      - PORT=${ELASTIC_CDN_PORT:-8090}

  crawler:
    container_name: crawler
    image: a11ywatch/crawler
    ports:
      - 50055

  mongodb:
    container_name: mongodb
    image: mongo
    ports:
      - 27017:27017
    volumes:
      - mongodb:/data/db
    environment:
      - MONGO_INITDB_DATABASE=${DB_NAME:-a11ywatch}

  redis:
    container_name: redis
    image: redis:7.0-rc2-alpine
    environment:
      - ALLOW_EMPTY_PASSWORD=yes

  chrome:
    image: ghcr.io/drpayyne/chrome
    container_name: chromium-browser
    command:
      [
        chromium-browser,
        '--headless=chrome',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-extensions',
        '--remote-debugging-address=0.0.0.0',
        '--remote-debugging-port=9222',
        '--max-wait-for-load=2500',
        '--disable-storage-reset',
        '--disable-dev-shm-usage',
        '--disable-http2',
        '--disable-accelerated-2d-canvas',
        '--disable-setuid-sandbox',
        '--hide-scrollbars',
        '--mute-audio',
        '--no-zygote',
        '--no-first-run',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
      ]
    ports:
      - 9222:9222

volumes:
  mongodb:

  "#
}

/// generate front end client
pub fn generate_compose_frontend() -> &'static str {
    &"
version: '3.9'
services:
  web:
    container_name: web
    image: a11ywatch/web
    ports:
      - 3270:3000
    networks:
      - front-net
    environment:
      - PORT=3000
      - API=${API:-http://localhost:3280/graphql}
      - WEB_SOCKET_URL=${WEB_SOCKET_URL:-ws://localhost:3280/graphql}

"
}

/// runner to exec commands against containers
pub fn generate_compose_runner(url: &str) -> String {
  format!("
  version: '3.9'
  services:
    runner:
      container_name: runner
      image: a11ywatch/runner
      environment:
        - WEBSITE_URL={url}

  ")
}
