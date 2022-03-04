terraform {
  required_version = ">= 0.13"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.78.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "3.78.0"
    }
  }
}

provider "google" {
  credentials = fileexists(var.credentials_file) ? file(var.credentials_file) : ""
  project     = var.project
  region      = var.region
  zone        = var.zone
}

provider "google-beta" {
  credentials = fileexists(var.credentials_file) ? file(var.credentials_file) : ""
  project     = var.project
  region      = var.region
  zone        = var.zone
}
