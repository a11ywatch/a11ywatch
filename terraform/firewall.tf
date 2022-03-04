resource "google_compute_firewall" "vpc_network" {
  name    = "terraform-network-firewall"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["80", "8080", "443"]
  }

  source_tags   = ["web"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "ssh-rule" {
  name    = "terraform-ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  target_tags   = ["web"]
  source_ranges = ["0.0.0.0/0"]
}