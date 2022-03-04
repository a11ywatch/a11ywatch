resource "google_dns_record_set" "resource-recordset" {
  provider = google-beta
  managed_zone = var.managed_zone
  name         = "app.${var.domain}."
  type         = "A"
  rrdatas      = [google_compute_global_forwarding_rule.default_https.ip_address]
  ttl          = 60
  project      = var.project
}