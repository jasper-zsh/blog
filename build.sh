#!/usr/bin/env bash

#------------------------------------------------------------------------------
# @file
# Downloads Hugo dependencies for building a Hugo site.
#------------------------------------------------------------------------------

main() {

  # DART_SASS_VERSION=1.90.0
  # GO_VERSION=1.24.5
  HUGO_VERSION=0.148.2
  # NODE_VERSION=22.18.0

  export TZ=Asia/Chongqing

  # Install Dart Sass
  # echo "Installing Dart Sass ${DART_SASS_VERSION}..."
  # curl -sLJO "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  # tar -C "${HOME}/.local" -xf "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  # rm "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  # export PATH="${HOME}/.local/dart-sass:${PATH}"

  # Install Go
  # echo "Installing Go ${GO_VERSION}..."
  # curl -sLJO "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
  # tar -C "${HOME}/.local" -xf "go${GO_VERSION}.linux-amd64.tar.gz"
  # rm "go${GO_VERSION}.linux-amd64.tar.gz"
  # export PATH="${HOME}/.local/go/bin:${PATH}"

  # Install Hugo
  echo "Installing Hugo ${HUGO_VERSION}..."
  curl -sLJO "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  mkdir -p "${HOME}/.local/hugo"
  tar -C "${HOME}/.local/hugo" -xf "hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  rm "hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  export PATH="${HOME}/.local/hugo:${PATH}"

  # Install Node.js
  # echo "Installing Node.js ${NODE_VERSION}..."
  # curl -sLJO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz"
  # tar -C "${HOME}/.local" -xf "node-v${NODE_VERSION}-linux-x64.tar.xz"
  # rm "node-v${NODE_VERSION}-linux-x64.tar.xz"
  # export PATH="${HOME}/.local/node-v${NODE_VERSION}-linux-x64/bin:${PATH}"

  # Verify installations
  # echo "Verifying installations..."
  # echo Dart Sass: "$(sass --version)"
  # echo Go: "$(go version)"
  echo "Verifying installation..."
  echo Hugo: "$(hugo version)"
  # echo Node.js: "$(node --version)"

  # Configure Git
  echo "Configuring Git..."
  git config core.quotepath false
  if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
    git fetch --unshallow
  fi

  # Run translation script
  echo "Running translation script..."
  # Install Node.js dependencies if needed
  if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
  fi
  
  # Run translation script
  node translate.js
  TRANSLATE_EXIT_CODE=$?
  
  # If there are updates, commit them and exit
  if [ $TRANSLATE_EXIT_CODE -eq 1 ]; then
    echo "Translation updates detected. Committing changes..."
    # Add updated translation files
    git add content/**/*.en.md
    # Commit changes
    git commit -m "Update translated files"
    echo "Translation updates committed. Exiting."
    exit 0
  elif [ $TRANSLATE_EXIT_CODE -eq 127 ]; then
    echo "Translation script failed with errors. Exiting."
    exit 127
  fi
  
  # Continue with Hugo build if no updates
  echo "No translation updates. Continuing with Hugo build..."

  # Build the site
  echo "Building the site..."
  hugo --gc --minify
}

set -euo pipefail
main "$@"