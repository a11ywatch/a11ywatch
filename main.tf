resource "a11ywatchwebservices_vpc" "primary_vpc" {
  name       = "Primary VPC"
  cidr_block = "0.0.0.0/1"
}

resource "a11ywatchwebservices_server" "servers" {
  count = 2
  name = "Server ${count.index + 1}"
  type = "t2.micro"
  vpc  = a11ywatchwebservices_vpc.primary_vpc.name
}

resource "a11ywatchwebservices_load_balancer" "primary_lb" {
  name    = "Primary Load Balancer"
  servers = a11ywatchwebservices_server.servers[*].name
}

resource "a11ywatchwebservices_database" "prod_db" {
  name = "Production DB"
  size = 256
}
