#!/bin/bash
CAMPSITE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Install deps and build frontend
cd $CAMPSITE_DIR/frontend
yarn
yarn run build

# Install deps and build backend
cd $CAMPSITE_DIR/backend
yarn
yarn run rollup

# Make the compiled file executable
chmod +x $CAMPSITE_DIR/backend/build/campsite.js

cd $CAMPSITE_DIR
# Cleanup old build artifacts and create build folder
rm -rf campsite.zip
rm -rf $CAMPSITE_DIR/campsite
mkdir $CAMPSITE_DIR/campsite

# Copy files into place
cp -R $CAMPSITE_DIR/config $CAMPSITE_DIR/campsite
mv $CAMPSITE_DIR/campsite/config/install.sh $CAMPSITE_DIR/campsite/install.sh
cp $CAMPSITE_DIR/backend/build/campsite.js $CAMPSITE_DIR/campsite/
cp $CAMPSITE_DIR/backend/package.json $CAMPSITE_DIR/campsite/
mv $CAMPSITE_DIR/frontend/build $CAMPSITE_DIR/campsite/frontend

zip -r campsite.zip campsite/
rm -rf $CAMPSITE_DIR/campsite