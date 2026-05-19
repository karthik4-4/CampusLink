terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

# Find the latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

# Create a default VPC (or use existing default)
resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

# Security group to allow HTTP, SSH, and App ports
resource "aws_security_group" "app_sg" {
  name        = "app_security_group"
  description = "Allow inbound traffic for app"
  vpc_id      = aws_default_vpc.default.id

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP/HTTPS standard
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Optional: Generate an SSH key pair
resource "tls_private_key" "pk" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "kp" {
  key_name   = "app-key"
  public_key = tls_private_key.pk.public_key_openssh
}

resource "local_file" "ssh_key" {
  filename        = "${path.module}/app-key.pem"
  content         = tls_private_key.pk.private_key_pem
  file_permission = "0400"
}

# EC2 Instance
resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  key_name      = aws_key_pair.kp.key_name

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  # User data to install docker, docker-compose and git
  user_data = <<-EOF
              #!/bin/bash
              # Update OS
              dnf update -y
              
              # Install Git
              dnf install -y git
              
              # Install Docker
              dnf install -y docker
              systemctl enable docker
              systemctl start docker
              
              # Add ec2-user to docker group
              usermod -aG docker ec2-user
              
              # Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              
              # Create app directory
              mkdir -p /home/ec2-user/app
              chown ec2-user:ec2-user /home/ec2-user/app
              EOF

  tags = {
    Name = "App-Server"
  }
}
