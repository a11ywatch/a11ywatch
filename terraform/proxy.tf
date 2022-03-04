resource "google_compute_target_http_proxy" "default" {
  name             = "test-proxy"
  url_map          = google_compute_url_map.default.id
}

resource "google_compute_target_https_proxy" "default_ssl" {
  name             = "test-proxy-ssl"
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
  ssl_policy       = var.ssl_policy
}