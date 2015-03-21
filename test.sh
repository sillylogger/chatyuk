#!/usr/bin/env bash


#
# Start necessary services
#

if vagrant status | grep -q "running"; then
  echo "Vagrant is running"
else
  vagrant up
fi

if ps aux | grep '[p]ython -m SimpleHTTPServer' > /dev/null; then
  echo "Python is running"
else
  python -m SimpleHTTPServer &>/dev/null &
fi

if ps aux | grep '[j]ava -jar selenium' > /dev/null; then
  echo "Selenium is running"
else
  wget --no-clobber http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar
  java -jar selenium-server-standalone-2.45.0.jar &>/dev/null &
fi



echo ''
echo 'Running npm install'
npm install &> /dev/null



npm run jshint
JSHINT_EXIT=$?

echo 'Precompiling assets'
browserify -p proxyquireify/plugin -e jasmine/spec/suite.js -t reactify -o jasmine/spec/bundle.js   --verbose
browserify                         -e app/chatyuk.jsx       -t reactify -o public/scripts/bundle.js --verbose

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

