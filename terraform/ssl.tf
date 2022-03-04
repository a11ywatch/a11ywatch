resource "google_compute_managed_ssl_certificate" "default" {
  name = "app"

  managed {
    domains = ["app.${var.domain}."]
  }

  lifecycle {
    create_before_destroy = true
  }
}