packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "autogenerated_1" {
  project_id          = "dev-assignment4"
  source_image_family = "centos-stream-8"
  ssh_username        = "packer"
  zone                = "us-central1-a"
}

build {
  sources = ["source.googlecompute.autogenerated_1"]

  provisioner "shell" {
    script  = "script.sh"
  }

}
