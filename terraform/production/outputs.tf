output "public_ip" {
  value       = module.compute.public_ip
  description = "The public IP address of the instance"
}

output "instance_id" {
  value       = module.compute.instance_id
  description = "The ID of the instance"
}
