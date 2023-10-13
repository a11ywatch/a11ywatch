/// generate central backend services [TODO: ALLOW DEFAULT PORT]
pub fn generate_compose_backend() -> &'static str {
    &r#"
version: '3.9'
services:
  api:
    container_name: api
    image: a11ywatch/a11ywatch-core
    ports:
      - 3280:3280
      - 50050:50050
      - 50051
    depends_on:
      - mongodb
    environment:
      - SUPER_MODE=${SUPER_MODE:-true}
      - DB_URL=${DB_URL:-mongodb://mongodb:27017}
      - DB_NAME=${DB_NAME:-a11ywatch}
      - APOLLO_GRAPH_VARIANT=${APOLLO_GRAPH_VARIANT:-current}
      - APOLLO_SCHEMA_REPORTING=${APOLLO_SCHEMA_REPORTING:-false}
      - EMAIL_SERVICE_URL=${EMAIL_SERVICE_URL:-""}
      - EMAIL_CLIENT_ID=${EMAIL_CLIENT_ID:-""}
      - EMAIL_CLIENT_KEY=${EMAIL_CLIENT_KEY:-""}
      - EMAIL_SERVICE_PASSWORD=${EMAIL_SERVICE_PASSWORD:-""}
      - CLIENT_URL=${CLIENT_URL:-http://localhost:3000}
      - GRAPHQL_PORT=${GRAPHQL_PORT:-3280}
      - ROOT_URL=${ROOT_URL:-http://localhost:3280}
      - REDIS_CLIENT=${REDIS_CLIENT:-redis://redis:6379}
      - REDIS_HOST=redis
      - DOCKER_CONTAINER=${DOCKER_CONTAINER:-true}
      - A11YWATCH_UA=${A11YWATCH_UA:-""}
    networks:
      - back-net
      - front-net

  pagemind:
    container_name: pagemind
    image: a11ywatch/pagemind
    ports:
      - 50052
    environment:
      - AI_DISABLED=${AI_DISABLED:-false}
      - GRPC_HOST_MAV=mav:50053
      - GRPC_HOST_CORE=api:50051
      - PAGEMIND_RECORD=${PAGEMIND_RECORD}
      - PAGESPEED_API_KEY=${PAGESPEED_API_KEY:-""}
    networks:
      - back-net

  mav:
    container_name: mav
    image: a11ywatch/mav
    ports:
      - 50053
    environment:
      - COMPUTER_VISION_ENDPOINT=${COMPUTER_VISION_ENDPOINT:-""}
      - COMPUTER_VISION_SUBSCRIPTION_KEY=${COMPUTER_VISION_SUBSCRIPTION_KEY:-""}
    networks:
      - back-net

  crawler:
    container_name: crawler
    image: a11ywatch/crawler:${CRAWLER_IMAGE:-debian}
    ports:
      - 50055
    networks:
      - back-net

  mongodb:
    container_name: mongodb
    image: mongo
    ports:
      - 27017:27017
    volumes:
      - mongodb:/data/db
    environment:
      - MONGO_INITDB_DATABASE=${DB_NAME:-a11ywatch}
    networks:
      - back-net

  redis:
    container_name: redis
    image: redis:7.0-rc2-alpine
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
    networks:
      - back-net
    ports:
      - 6379

  chrome:
    image: a11ywatch/chrome
    container_name: chrome
    ports:
      - 9222:9222
      - 6000:6000
    networks:
      - back-net

volumes:
  mongodb:

networks:
  front-net:
  back-net:

  "#
}

/// generate standalone backend
pub fn generate_compose_backend_sa() -> &'static str {
    &r#"
version: '3.9'
services:
  a11ywatch:
    container_name: a11ywatch
    image: a11ywatch/a11ywatch:${A11YWATCH_IMAGE:-latest}
    environment:
      - COMPUTER_VISION_ENDPOINT=${COMPUTER_VISION_ENDPOINT:-""}
      - COMPUTER_VISION_SUBSCRIPTION_KEY=${COMPUTER_VISION_SUBSCRIPTION_KEY:-""}
      - PAGESPEED_API_KEY=${PAGESPEED_API_KEY:-""}
      - AI_DISABLED=${AI_DISABLED:-false}
      - SUPER_MODE=${SUPER_MODE:-true}
    ports:
      - "3280:3280"
      - "50050:50050"
      - "50051:50051"
    networks:
      - front-net
  
networks:
  front-net:

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
      - DOCKER_CONTAINER=true

networks:
  front-net:
  
"
}
