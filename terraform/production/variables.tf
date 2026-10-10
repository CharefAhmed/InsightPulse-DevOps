variable "environment" {
  type        = string
  description = "Environment name "
}

variable "flavor_name" {
  type        = string
  description = "OpenStack flavor name "
}

variable "image_name" {
  type        = string
  description = "OpenStack image name "
}

variable "region" {
  type        = string
  description = "OpenStack region"
}

variable "public_key" {
  type        = string
  description = "SSH public key content to register on OpenStack"
  sensitive   = true
}
