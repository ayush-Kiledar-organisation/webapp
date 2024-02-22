packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "ass4_image" {
  project_id          = "dev-assignment4"
  source_image_family = "centos-stream-8"
  ssh_username        = "packer"
  zone                = "us-central1-a"
  image_name          = "myimage"
}

build {
  sources = ["source.googlecompute.ass4_image"]


  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/webapp.zip"
  }


  provisioner "shell" {
    script  = "script.sh"
  }

    provisioner "shell" {
    scripts = [
      "systemd.sh",
    ]
  }

}
