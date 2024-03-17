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
  image_name          = "myimage3"
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

  # Installing Ops Agent
  provisioner "shell" {
    inline = [
      "curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh",
      "sudo bash add-google-cloud-ops-agent-repo.sh --also-install"
    ]
  }

}
