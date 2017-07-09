"use strict";

var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/zeuslearning";

module.exports.connect  = function(err,callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //console.log("Database created!",db);
    callback(err,db);

  });
}

//for inserting data to collection
module.exports.insertUser = function(db, user, callback) {
   db.collection('userList').insertOne( user ,
  /*   {
      "firstName" : "sachin",
      "lastName":"patil",
      "emailId" : "Manhattan",
      "password" : "Italian",
      "DOB" : "Manhattan",
      "city" : "Italian",
      "userType" : "Manhattan",
      "userStatus" : "Italian",
      "restaurant_id" : "41704620"
   }
   */
   function(err, result) {

    console.log("Inserted a document into the userList collection.");
    callback(err,result);
  });
};

//for find/fetching data from collection
module.exports.findUsers = function(db, callback) {
    //console.log("sachin");
   db.collection('userList').find( ).toArray(function(err, result) {
    callback(err,result);
  });
};

//for finding particular user with id
module.exports.findUser = function(db, id, callback) {

    //console.log("sachin");
   db.collection('userList').find({ _id :new ObjectID( id )}).toArray(function(err, result) {
    callback(err,result);
  });
};


//for updating data to collection
module.exports.updateUser = function(db, user, callback) {

  user._id = new ObjectID( user._id );
  console.log("in mongo update user",user);
   db.collection('userList').updateOne(
      { _id : user._id },
      {
        $set: user
      }, function(err, results) {
        if(err)
          console.log(err);
      console.log("result: ",results);
      callback(results);
   });
};

//for removing one document from collection
module.exports.deleteUser = function(db, id, callback) {
   db.collection('userList').deleteOne(
      { _id :new ObjectID( id )},function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    //db.close();
    callback(err,obj);
  }
   );
};
