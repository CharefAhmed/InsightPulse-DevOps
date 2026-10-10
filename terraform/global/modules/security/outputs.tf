output "security_group_id" {
  value = openstack_networking_secgroup_v2.sg.id
}

output "security_group_name" {
  value = openstack_networking_secgroup_v2.sg.name
}
