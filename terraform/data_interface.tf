data "google_compute_image" "os" {
  project = "cos-cloud"
  family  = "cos-stable"
}

data "template_file" "user_data" {
  template = file("./add-ssh-web-app.yaml")
}
