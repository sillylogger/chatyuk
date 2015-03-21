#!/usr/bin/env bash

echo 'Running npm install'
npm install &> /dev/null

npm run jshint
JSHINT_EXIT=$?

echo 'Precompiling assets'
browserify -p proxyquireify/plugin -e jasmine/spec/suite.js -t reactify -o jasmine/spec/bundle.js   --verbose
browserify                         -e app/chatyuk.jsx       -t reactify -o public/scripts/bundle.js --verbose

if ps aux | grep '[p]ython -m SimpleHTTPServer' > /dev/null; then
  echo "Python webserver should be running"
else
  python -m SimpleHTTPServer &
fi

npm run nightwatch
NIGHTWATCH_EXIT=$?

if  [ $JSHINT_EXIT -eq 0 ] &&
    [ $NIGHTWATCH_EXIT -eq 0 ]
then
  EXIT_CODE=0
else
  EXIT_CODE=1
fi

echo "Exiting with status code: $EXIT_CODE"
exit $EXIT_CODE
