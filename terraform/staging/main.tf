terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 2.1"
    }
  }
}

provider "openstack" {
}

module "security" {
  source      = "../global/modules/security"
  environment = var.environment
}


resource "openstack_compute_keypair_v2" "keypair" {
  name       = "insightpulse-key-${var.environment}"
  public_key = var.public_key
}

module "compute" {
  source             = "../global/modules/compute"
  environment        = var.environment
  flavor_name        = var.flavor_name
  image_name         = var.image_name
  keypair_name       = openstack_compute_keypair_v2.keypair.name
  security_group_ids = [module.security.security_group_name]
}
