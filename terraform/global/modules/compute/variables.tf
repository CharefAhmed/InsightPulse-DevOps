variable "environment" {
  type        = string
  description = "Environment name"
}

variable "flavor_name" {
  type        = string
  description = "OpenStack flavor name"
}

variable "image_name" {
  type        = string
  description = "OpenStack image name"
}

variable "keypair_name" {
  type        = string
  description = "SSH keypair name registered in OpenStack"
}

variable "network_name" {
  type        = string
  description = "External network name"
  default     = "Ext-Net"
}

variable "security_group_ids" {
  type        = list(string)
  description = "List of security group names to attach to the instance"
}
