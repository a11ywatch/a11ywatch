resource "google_compute_network" "vpc_network" {
  name                    = "terraform-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "vpc_network" {
  name          = "terraform-network"
  ip_cidr_range = "10.0.0.0/16"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_backend_service" "backend" {
  name              = "website-backend"
  health_checks     = [google_compute_health_check.hc.id]
  backend {
    group           = google_compute_instance_group.webservers.id
    balancing_mode  = "UTILIZATION"
    capacity_scaler = 1.0
  }
  timeout_sec       = 10
}