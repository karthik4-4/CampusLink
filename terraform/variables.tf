variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro" # t3.micro is free-tier eligible in this region/account. We will use swap space to handle memory limits.
}

variable "key_name" {
  description = "Name of the existing AWS Key Pair to associate with the instance"
  type        = string
  default     = "app-key"
}
