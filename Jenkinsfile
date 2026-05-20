pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'thalakantikarthikkumarreddy'
        AWS_DEFAULT_REGION  = 'us-east-1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                withCredentials([
                    string(credentialsId: 'next-public-google-client-id', variable: 'GOOGLE_CLIENT_ID')
                ]) {
                    echo "Building Backend Docker image..."
                    sh "docker build -t ${DOCKER_HUB_USERNAME}/campuslink-backend:${BUILD_NUMBER} -t ${DOCKER_HUB_USERNAME}/campuslink-backend:latest ./Backend"
                    
                    echo "Building Frontend Docker image..."
                    sh "docker build --build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} -t ${DOCKER_HUB_USERNAME}/campuslink-frontend:${BUILD_NUMBER} -t ${DOCKER_HUB_USERNAME}/campuslink-frontend:latest ./Frontend"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                ]) {
                    echo "Logging into Docker Hub..."
                    sh "echo \"${DOCKER_PASS}\" | docker login -u \"${DOCKER_USER}\" --password-stdin"
                    
                    echo "Pushing Backend images..."
                    sh "docker push ${DOCKER_HUB_USERNAME}/campuslink-backend:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_HUB_USERNAME}/campuslink-backend:latest"
                    
                    echo "Pushing Frontend images..."
                    sh "docker push ${DOCKER_HUB_USERNAME}/campuslink-frontend:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_HUB_USERNAME}/campuslink-frontend:latest"
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir('terraform') {
                        echo "Initializing Terraform..."
                        sh "terraform init"
                        
                        echo "Applying Terraform changes..."
                        sh "terraform apply -auto-approve"
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([
                    string(credentialsId: 'jwt-password', variable: 'JWT_PASS'),
                    string(credentialsId: 'next-public-google-client-id', variable: 'GOOGLE_CLIENT_ID'),
                    file(credentialsId: 'ec2-ssh-key', variable: 'SSH_KEY')
                ]) {
                    script {
                        // Retrieve the deployed EC2 public IP from Terraform
                        dir('terraform') {
                            def ip = sh(script: "terraform output -raw instance_public_ip", returnStdout: true).trim()
                            env.INSTANCE_IP = ip
                        }
                        
                        echo "Target Instance IP is: ${env.INSTANCE_IP}"

                        // Create a temporary .env file for the deployment
                        sh """
                            echo 'DOCKER_HUB_USERNAME=${DOCKER_HUB_USERNAME}' > .env.prod
                            echo 'JWT_PASSWORD=${JWT_PASS}' >> .env.prod
                            echo 'INSTANCE_IP=${env.INSTANCE_IP}' >> .env.prod
                            echo 'NEXT_PUBLIC_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}' >> .env.prod
                        """

                        // Fix the permissions of the generated ssh key
                        sh "chmod 400 \${SSH_KEY}"

                        // Wait for SSH to become available on the EC2 instance
                        echo "Waiting for SSH daemon on EC2 to accept connections..."
                        sh """
                            bash -c '
                            count=0
                            until ssh -i \${SSH_KEY} -o StrictHostKeyChecking=no -o ConnectTimeout=5 ec2-user@\${INSTANCE_IP} exit 2>/dev/null; do
                                if [ \$count -gt 24 ]; then
                                    echo "Timed out waiting for SSH daemon on EC2"
                                    exit 1
                                fi
                                echo "Still waiting for SSH daemon..."
                                sleep 5
                                count=\$((count+1))
                            done
                            '
                        """

                        // Copy docker-compose.prod.yml and .env.prod (as .env) to the remote host
                        echo "Copying configuration files to EC2..."
                        sh "ssh -i \${SSH_KEY} -o StrictHostKeyChecking=no ec2-user@\${INSTANCE_IP} 'mkdir -p /home/ec2-user/app/prometheus'"
                        sh "scp -i \${SSH_KEY} -o StrictHostKeyChecking=no docker-compose.prod.yml ec2-user@\${INSTANCE_IP}:/home/ec2-user/app/docker-compose.prod.yml"
                        sh "scp -i \${SSH_KEY} -o StrictHostKeyChecking=no .env.prod ec2-user@\${INSTANCE_IP}:/home/ec2-user/app/.env"
                        sh "scp -i \${SSH_KEY} -o StrictHostKeyChecking=no prometheus/prometheus.yml ec2-user@\${INSTANCE_IP}:/home/ec2-user/app/prometheus/prometheus.yml"

                        // Deploy by pulling the latest images and starting the containers
                        echo "Pulling images and starting services on EC2..."
                        sh """
                            ssh -i \${SSH_KEY} -o StrictHostKeyChecking=no ec2-user@\${INSTANCE_IP} '
                                cd /home/ec2-user/app
                                docker-compose -f docker-compose.prod.yml pull
                                docker-compose -f docker-compose.prod.yml up -d
                            '
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up files containing sensitive credentials
            sh 'rm -f .env.prod'
        }
    }
}
