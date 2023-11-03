pipeline {
    agent any

    // environment {
	// 	DOCKERHUB_CREDENTIALS=credentials('Docker_Hub')
	// }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying to AWS...'
        //         sh 'terraform apply --auto-approve'
        //     }
        // }
    }
}