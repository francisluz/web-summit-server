var request = require('request')

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /speakers/:personId
//   router.route('/:personId')
//   .get(function(req, res, next) {
//     // Return user
//   }) 
//   .put(function(req, res, next) {
//     // Update user
//   })
//   .patch(function(req, res,next) {
//     // Patch
//   })
//   .delete(function(req, res, next) {
//     // Delete record
//   });

  router.route('/')
  .get(function(req, res, next) {
    var apiUrl = 'https://1daycache.websummit.com/v1/conferences/companies/madmin/lists/top-50-previously-at-our-events/info?limit=15';
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
        res.send(json);
        } else {
        next();
        }
    });
  });
};