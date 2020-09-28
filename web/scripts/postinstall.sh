    #!/bin/bash

	  # rm -rf src 

    if [ "$GITHUB_TOKEN" != "" ]; then
      echo "Cleaning up npm rc" >&1
      echo "" >&1
      rm -f .npmrc
      export GITHUB_TOKEN=0
    fi