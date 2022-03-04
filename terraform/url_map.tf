resource "google_compute_url_map" "default" {
  name        = "url-map"
  description = "the dns url map"
  default_service = google_compute_backend_service.backend.id

  host_rule {
    hosts        = ["app.${var.domain}"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_service.backend.id
  }
}