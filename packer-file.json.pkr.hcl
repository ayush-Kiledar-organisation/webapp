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

  provisioner "file" {
    content = <<EOF
  logging:
  receivers:
    webapp-receiver:
      type: files
      include_paths:
        - /var/log/myapp.log
      record_log_file_path: true
  processors:
    webapp-processor:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
  service:
    pipelines:
      default_pipeline:
        receivers: [webapp-receiver]
        processors: [webapp-processor]
  EOF
      destination = "/etc/google-cloud-ops-agent/config.yaml"
  }

  provisioner "shell" {
    inline = [
      "sudo systemctl restart google-cloud-ops-agent"
    ]
  }
}
