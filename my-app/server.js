var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var json2xls = require("json2xls");

var mime = require('mime');
//var file_saver = require("file-saver");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "heroes";
var USERS_COLLECTION = "users";


var app = express();
app.use(bodyParser.json());

app.use(json2xls.middleware);
var fs = require('fs');


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://heroku_ws02q2n4:81ipi9qvak72fiht3aebr51fdd@ds135963.mlab.com:35963/heroku_ws02q2n4", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/heroes"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get('/api/heroes', function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.get('/api/export', function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      var xls = json2xls(docs);
      res.status(200);
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader('Content-Disposition', `attachment; filename=data.xlsx`);

      //fs.writeFileSync('data.xlsx', xls, 'binary');

      res.end(fs.readFileSync('data.xlsx', 'binary'));

      console.log("got to export");
    }
 });
});



app.post('/api/heroes', function(req, res) {
  var newContact = req.body;
  //newContact.createDate = new Date();

  if (!req.body.name) {
   handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/heroes/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/heroes/:id", function(req, res) {
  obj_id = ObjectID.createFromHexString(req.params.id)
  db.collection(CONTACTS_COLLECTION).findOne({ _id: obj_id }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/heroes/:id", function(req, res) {
  obj_id = ObjectID.createFromHexString(req.params.id)
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: obj_id}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      updateDoc.name = req.params.name;
      res.status(200).json(updateDoc);
    }
  });
});



app.delete("/api/heroes/:id", function(req, res) {
  obj_id = ObjectID.createFromHexString(req.params.id)
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: obj_id}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});






app.post("/api/login", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  
  db.collection(USERS_COLLECTION).findOne({username: username, password:password}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      if(doc)res.status(200).json(doc);
      
    else res.status(404).json(doc);
      
   
    }
  });
});

app.put('/api/upload/:id', function(req, res) {
  obj_id = ObjectID.createFromHexString(req.params.id)
  var image = req.body._dataURL;
 console.log(image)
 db.collection(CONTACTS_COLLECTION).updateOne({_id: obj_id},   {$set : {"image":image}}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(200).json(doc);
    }
  });
});
