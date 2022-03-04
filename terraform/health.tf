resource "google_compute_health_check" "hc" {
  provider           = google-beta
  name               = "http-health-check"
  check_interval_sec = 30
  unhealthy_threshold = 10
  http_health_check {
    request_path       = "/"
  }
}