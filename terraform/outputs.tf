output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "ssh_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i app-key.pem ec2-user@${aws_instance.app_server.public_ip}"
}

output "frontend_url" {
  description = "URL to access the frontend"
  value       = "http://${aws_instance.app_server.public_ip}:3000"
}

output "backend_url" {
  description = "URL to access the backend API"
  value       = "http://${aws_instance.app_server.public_ip}:8080"
}
