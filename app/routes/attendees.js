var request = require('request');
var DataItem = require('./models/dataitem');

module.exports = function(router) {
  'use strict';

  router.route('/')
  .get(function(req, res, next) {
    var apiUrl = 'https://1daycache.websummit.com/v1/conferences/ws16/info/attendees?limit=15&page=1';
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

    var items = data.attendees.map(function(people){
        return new DataItem(
            people.id,
            people.name,
            people.medium_image,
            people.bio,
            people.career,
            people.company,
            people.country
        );
    });

    return { dataitem: items };
}