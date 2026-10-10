terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}

resource "openstack_compute_instance_v2" "vm" {
  name            = "insightpulse-${var.environment}"
  image_name      = var.image_name
  flavor_name     = var.flavor_name
  key_pair        = var.keypair_name
  security_groups = var.security_group_ids

  network {
    name = var.network_name
  }

  user_data = <<-EOF
              #!/bin/bash
              echo "Instance is ready" > /var/log/instance-ready.log
              EOF

  metadata = {
    environment = var.environment
    project     = "insightpulse"
  }
}
