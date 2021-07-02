resource "aws_vpc" "primary_vpc" {
  name       = "Primary VPC"
  cidr_block = "0.0.0.0/1"
}

resource "aws_server" "servers" {
  count = 2
  name = "Server ${count.index + 1}"
  type = "t2.micro"
  vpc  = a11ywatchwebservices_vpc.primary_vpc.name
}

resource "aws_load_balancer" "primary_lb" {
  name    = "Primary Load Balancer"
  servers = a11ywatchwebservices_server.servers[*].name
}

resource "aws_database" "prod_db" {
  name = "Production DB"
  size = 256
}
