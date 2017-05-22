var request = require('request')
var DataItem = require('../models/dataitem');

module.exports = function(router) {
  'use strict';

  router.route('/')
  .get(function(req, res, next) {
    var apiUrl = 'https://1daycache.websummit.com/v1/conferences/ws16/madmin/lists/ws-2016---investors/info?limit=15';
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

    var items = data.people.map(function(people){
        return new DataItem(
            people.id,
            people.full_name,
            people.medium_image,
            people.bio,
            people.job_title,
            people.company_name,
            people.country_name
        );
    });

    return { dataitem: items };
}