pipeline {
  agent any
  
  environment {
    HUGO_VERSION = '0.148.2'
    TZ = 'Asia/Chongqing'
  }
  
  stages {
    stage('Configure Git') {
      steps {
        script {
          sh 'git config core.quotepath false'
          if (sh(script: 'git rev-parse --is-shallow-repository', returnStdout: true).trim() == 'true') {
            sh 'git fetch --unshallow'
          }
        }
      }
    }
    
    stage('Run Translation') {
      steps {
        script {
          // Install Node.js dependencies if needed
          if (!fileExists('node_modules')) {
            sh 'npm install'
          }
          
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
    
    stage('Install Hugo') {
      steps {
        script {
          echo "Installing Hugo ${HUGO_VERSION}..."
          sh "curl -sLJO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
          sh 'mkdir -p "${HOME}/.local/hugo"'
          sh 'tar -C "${HOME}/.local/hugo" -xf "hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"'
          sh 'rm "hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"'
          sh 'export PATH="${HOME}/.local/hugo:${PATH}"'
        }
      }
    }
    
    stage('Verify Installation') {
      steps {
        script {
          echo 'Verifying installation...'
          sh 'hugo version'
        }
      }
    }
    
    stage('Build Site') {
      steps {
        script {
          echo 'Building the site...'
          sh 'hugo --gc --minify'
        }
      }
    }
  }
  
  post {
    success {
      script {
        echo 'Build completed successfully.'
      }
    }
    failure {
      script {
        echo 'Build failed.'
      }
    }
  }
}