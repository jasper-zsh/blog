pipeline {
  agent {
    kubernetes {
      yaml """
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: hugo
            image: docker.zcar.tech/jasper/hugo:0.148.2-aio-1
            command:
            - cat
            tty: true
            env:
            - name: HOME
              value: /home/jenkins/agent
          """
    }
  }
  
  environment {
    HUGO_VERSION = '0.148.2'
    TZ = 'Asia/Chongqing'
    DASHSCOPE_API_KEY = credentials('Dashscope')
  }
  
  stages {
    stage('Configure Git') {
      steps {
        container('hugo') {
          sh 'git config --global --add safe.directory /home/jenkins/agent/workspace/blog'
          sh 'git config core.quotepath false'
          script {
            if (sh(script: 'git rev-parse --is-shallow-repository', returnStdout: true).trim() == 'true') {
              sh 'git fetch --unshallow'
            }
          }
        }
      }
    }
    
    stage('Install Dependencies') {
      steps {
        container('hugo') {
          sh 'npm install'
        }
      }
    }
    
    stage('Build and deploy') {
      steps {
        container('hugo') {
          script {
            // Run translation script
            def translateExitCode = sh(script: 'node translate.js', returnStatus: true)
            
            // If there are updates, commit them and exit
            if (translateExitCode == 1) {
              echo 'Translation updates detected. Committing changes...'
              sh 'git add content/**/*.en.md'
              sh 'git commit -m "Update translated files [AI]"'
              // Configure Git credentials for push
              withCredentials([usernamePassword(credentialsId: 'Github', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                sh '''
                  git config --global credential.helper store
                  echo "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com" > ~/.git-credentials
                  git push origin HEAD:${GIT_BRANCH}
                '''
              }
              echo 'Translation updates committed and pushed. Exiting.'
              currentBuild.result = 'SUCCESS'
              return
            } else if (translateExitCode == 127) {
              echo 'Translation script failed with errors. Exiting.'
              currentBuild.result = 'FAILURE'
              error('Translation script failed')
            }
            
            // Continue with Hugo installation and build if no updates
            echo 'No translation updates. Continuing with Hugo build...'
            sh 'hugo --gc --minify'
            withCredentials([usernamePassword(credentialsId: 'cloudflare_workers', usernameVariable: 'CLOUDFLARE_ACCOUNT_ID', passwordVariable: 'CLOUDFLARE_API_TOKEN')]) {
              sh 'npx wrangler deploy'
            }
          }
        }
      }
    }
  }
  
  post {
    success {
      echo 'Build and deployment completed successfully.'
    }
    failure {
      echo 'Build or deployment failed.'
    }
  }
}