var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');
var fs  = require('fs');

var array = [];
var data = [];
 
var requestOptions  = { method: "GET"
            ,uri: "http://score.sports.media.daum.net/record/soccer/primera/prnk.daum"
            ,headers: { "User-Agent": "Mozilla/5.0" }
            ,encoding: null
                    };
 
request(requestOptions, function(error, response, body) {
    if (!error && response.statusCode == 200) 
    {
      var $ = cheerio.load(body);
      links = $("table tr");

      $('.hide td').each(function(j) {
             value_data = $(this).text();
             array.push(value_data); 
          });
      
      console.log(array.length);
      
      for (var lp=0; lp < (array.length) ; lp++) {
        
        if ((lp % 6) == 0) {
           console.log(array[lp]+","+array[lp+1]+","+array[lp+2]+","+array[lp+3]+","+array[lp+4]+","+array[lp+5]);
           
           sport_no=array[lp];
           sport_name=array[lp+1];
           sport_match=array[lp+2];
           sport_score=array[lp+3];
           sport_assist=array[lp+4]
           sport_point=array[lp+5];
           
           var metadata = {
                 no: sport_no,
                 name: sport_name,
                 match: sport_match,
                 score: sport_score,
                 assist: sport_assist,
                 point: sport_point,
           };
            
            data.push(metadata);
        }
      }
      console.log(data);
                
     } // end of if
});  // end of request



