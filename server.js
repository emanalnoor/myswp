
var express = require('express');
var app = express();


var mongojs = require('mongojs');
var emdb = mongojs('[emandatabass]', ['contactlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());




app.get('/contactlist', function (req, res) {
    // console.log('I received a GET request');

    emdb.contactlist.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function (req, res) {
    emdb.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    emdb.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    emdb.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    emdb.contactlist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {
                $set: {
                    name: req.body.name,
                    number: req.body.number,
                    job: req.body.job,
                    location: req.body.location
                }
            },
            new: true
        }, function (err, doc) {
            res.json(doc);
        }
    );
});

app.get('/signup', function (req, res) {
    // console.log(req.body);
    res.redirect('index.html');
});
app.post('/signup', function (req, res) {
    emdb.user.insert(req.body, function (err, doc) {
        
        res.json(doc);
    });
});

app.post('/login', function (req, res) {
    var test=false;
    emdb.user.findOne({username: req.body.username , password: req.body.password}, function (err, doc) {
        if (doc !== null){
            res.json(doc);
        }
    });
    
});

app.get('/signout', function(req, res) {
    
    
});
app.listen(process.env.PORT || 3000);
console.log("Work !!");
console.log("go to <http://localhost:3000> ");
