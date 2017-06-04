wget -m -np -nH -w10 -P fixtures http://m.itsu.com/locations/shops/

# Unfortunately wget doesn't percent-encode apostrophes
mv fixtures/locations/shops/king\'s_road_UK68.html fixtures/locations/shops/king%27s_road_UK68.html
mv fixtures/locations/shops/regent\'s_place_UK47.html fixtures/locations/shops/regent%27s_place_UK47.html
