pipeline {
  agent {
    kubernetes {
      yaml """
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: hugo
            image: docker.zcar.tech/jasper/hugo:0.148.2-aio
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
    
    stage('Run Translation') {
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
              sh 'git push'
              echo 'Translation updates committed and pushed. Exiting.'
              currentBuild.result = 'SUCCESS'
              return
            } else if (translateExitCode == 127) {
              echo 'Translation script failed with errors. Exiting.'
              currentBuild.result = 'FAILURE'
              error('Translation script failed')
            }
            
            // Continue with Hugo installation and build if no updates
            echo 'No translation updates. Continuing with Hugo installation and build...'
          }
        }
      }
    }
    
    stage('Build Site') {
      steps {
        container('hugo') {
          sh 'hugo --gc --minify'
        }
      }
    }
    
    stage('Deploy to Cloudflare') {
      steps {
        container('hugo') {
          withCredentials([usernamePassword(credentialsId: 'cloudflare_workers', usernameVariable: 'CLOUDFLARE_ACCOUNT_ID', passwordVariable: 'CLOUDFLARE_API_TOKEN')]) {
            sh 'npx wrangler deploy'
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