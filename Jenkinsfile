pipeline {
    agent any

    environment {
		AWS_ACCESS_KEY_ID=credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY=credentials('AWS_SECRET_ACCESS_KEY')
	}

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh "npm install"
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to AWS...'
                sh 'terraform init'
                sh 'terraform apply --auto-approve'
            }
        }
    }
}