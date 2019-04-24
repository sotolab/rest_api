var request = require("request");
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');

var array = [];
var data = [];


var requestOptions = {
  method: "GET"
  , uri: "http://www.fifa.com/fifa-world-ranking/index.html"
  , headers: { "User-Agent": "Mozilla/5.0" }
  , encoding: null
};

request(requestOptions, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);

    $('.fi-module-ranking__ranking__item__name').each(function (j) {
      countrycode = $(this).text();
      array.push(countrycode);
      console.log("countrycode[" + j + "]:" + countrycode);
      // console.log(array.length);
    });

    $('.fi-module-ranking__ranking__item__points').each(function (j) {
      points = $(this).text();
      array.push(points);
      console.log("points: [" + j + "]:" + points);
      // console.log(array.length);
    });

    console.log("Top 10 - Men's");
    console.log($('.ranking-dates').text());

    for (var lp = 0; lp < 20; lp++) {

    var metadata = {
		countrycode: array[lp],
		points: array[lp+20],		
	};

    
      data.push(metadata);
    }
    console.log(data);

  } // end of if
});  // end of request
