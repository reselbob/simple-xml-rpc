#!/usr/bin/env bash
# generate the client code for the browser
npx webpack --config client.config.js

cp ./main.js ./js/main.js

rm ./main.js