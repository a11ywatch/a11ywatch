resource "google_compute_global_forwarding_rule" "default" {
  name       = "forwarding-rule-http"
  port_range = "80"
  target     = google_compute_target_http_proxy.default.self_link
}

resource "google_compute_global_forwarding_rule" "default_https" {
  name       = "forwarding-rule-https"
  target     =  google_compute_target_https_proxy.default_ssl.self_link
  port_range = "443"
}