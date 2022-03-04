resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "e2-medium"
  tags         = ["web", "dev", "http-server", "https-server"]


  boot_disk {
    initialize_params {
      image = data.google_compute_image.os.self_link
      size = 15
    }
  }

  network_interface {
    network    = google_compute_network.vpc_network.self_link
    subnetwork = google_compute_subnetwork.vpc_network.id

    access_config {
      nat_ip   = google_compute_address.static.address
    }
  }

  connection {
    type        = "ssh"
    user        = "terraform"
    private_key = file("tf-cloud-init")
    agent       = true
    host        = google_compute_instance.vm_instance.network_interface[0].access_config[0].nat_ip
  }

  provisioner "file" {
    source      = "uploads/"
    destination = "/home/terraform/"
  }

  metadata = {
    user-data = data.template_file.user_data.rendered
    ssh-keys  = "terraform:${file("tf-cloud-init.pub")}"
  }
}

resource "google_compute_instance_group" "webservers" {
  name        = "terraform-servers"
  description = "Terraform instance group"

  instances = [
    google_compute_instance.vm_instance.id,
  ]

  named_port {
    name = "http"
    port = "80"
  }

  named_port {
    name = "https"
    port = "443"
  }

  network = google_compute_network.vpc_network.id
  zone    = var.zone
}
