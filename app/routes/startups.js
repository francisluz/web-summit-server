var request = require('request');
var DataItem = require('./models/dataitem');

module.exports = function(router) {
  'use strict';

  router.route('/')
  .get(function(req, res, next) {
    var apiUrl = 'https://1daycache.websummit.com/v1/conferences/ws16/info/startups/alumni?limit=15';
    var reqCall = {
        url: apiUrl,
        json: true
    }
    request.get(reqCall, function(err, response, json){
        if (err) {
            throw err;
        }
        if (response.statusCode == 200) {
            // var data = JSON.parse(json)
            res.send(deserialize(json));
        } else {
            next();
        }
    });
  });
};

function deserialize(data){

    var items = data.startups.map(function(startup){
        return new DataItem(
            startup.id,
            startup.company_name,
            startup.brandisty_url,
            startup.description,
            null,
            startup.company_name,
            startup.country
        );
    });

    return { dataitem: items };
}