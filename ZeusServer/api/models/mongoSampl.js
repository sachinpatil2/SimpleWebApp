"use strict";

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/zeuslearning";


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!",db);
    //callback(err,db);

    findRestaurants(db, function() {
      db.close();
  });

  });

// insertDocument(db, function() {
//       db.close();
//   });
// findRestaurants(db, function() {
//       db.close();
//   });
//for inserting data to collection
var insertDocument = function(db, callback) {
   db.collection('userList').insertOne( {
      "firstName" : "sachin",
      "lastName":"patil",
      "emailId" : "Manhattan",
      "password" : "Italian",
      "DOB" : "Manhattan",
      "city" : "Italian",
      "userType" : "Manhattan",
      "userStatus" : "Italian",
      "restaurant_id" : "41704620"
   }, function(err, result) {

    console.log("Inserted a document into the userList collection.");
    callback(err,result);
  });
};

//for find/fetching data from collection
var findRestaurants = function(db, callback) {
    console.log("sachin");
   var cursor =db.collection('userList').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    //db.close();
  });

   //callback(db,cursor);
};


//for updating data to collection
var updateRestaurants = function(db, callback) {
   db.collection('userList').updateOne(
      { "name" : "Juni" },
      {
        $set: { "cuisine": "American (New)" },
        $currentDate: { "lastModified": true }
      }, function(err, results) {
      console.log(results);
      callback();
   });
};

//for removing one document from collection
var removeRestaurants = function(db, callback) {
   db.collection('userList').deleteOne(
      { "borough": "Queens" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
