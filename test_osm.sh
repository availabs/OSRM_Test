#!/bin/bash

cp ~/code/BorderProject/test_1.osm ~/code/OSRM_Test/data/test_osm/test_1.osm

OSM_DATA=data/test_osm/test_1.osm
OSRM_DATA=data/test_osm/test_1.osrm

node_modules/osrm/lib/binding/osrm-extract $OSM_DATA -p node_modules/osrm/profiles/foot.lua
node_modules/osrm/lib/binding/osrm-contract $OSRM_DATA