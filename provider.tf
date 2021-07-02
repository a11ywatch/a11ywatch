variable "provider_token" {
  type = string
  default = ""
}

provider "aws" {
  token = var.provider_token
}
