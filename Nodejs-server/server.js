const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoDb  = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser());



app.get('/', function (req, res) {
	res.send('Hello, This is my CRUD API');
});

app.get('/getTodos', function (req, res) {
	mongoDb( function (client, db, objectID) {
    	db.collection('todos').find({}).toArray(function (err, results) {
			if (err) {
				res.status(500).json({
					error: true,
					todo: []
				});
			} else {
				res.status(200).json({
					error: false,
					todo: results
				});
			}
      	});
    });    
});

app.post('/addTodo', function (req, res) {
	const abcName = req.body.name;
	mongoDb(function (client, db) {
		db.collection('todos').insert({
			name: abcName
		}, function (err, insertedResults) {
			if (err) {
				res.status(500).json({
					error: true,
					todo: []
				});
			} else {
				db.collection('todos').find({}).toArray(function (err, results) {
					if (err) {
						res.status(500).json({
							error: true,
							todo: []
						});
					} else {
						res.status(200).json({
							error: false,
							todo: results
						});
					}
				});
			}
		});
	});

});


app.delete('/deleteTodo/:id', function (req, res) {
	const id = req.params.id;
	mongoDb(function (client, db, objectID) {
		db.collection('todos').remove({
			_id: objectID(id)
		}, function (err, deletedResults) {
			if (err) {
				res.status(500).json({
					error: false,
					todo: []
				});
			} else {
				db.collection('todos').find({}).toArray(function (err, results) {
					if (err) {
						res.status(500).json({
							error: false,
							todo: []
						});
					} else {
						res.status(200).json({
							error: false,
							todo: results
						});
					}
				});
			}
		});
	});
});


app.patch('/updateTodo', function (req, res) {
	const id = req.body.id;
	const name = req.body.name;
  	mongoDb(function (client, db, objectID) {
    	db.collection('todos').update(
     		{
				_id: objectID(id),
			},
			{
        		$set: {
          			name: name,
        	}
    	},
      	function (err, updatedResults) {
			if (err) {
				res.status(500).json({
					error: false,
					todo: []
				});
			} else {
				db.collection('todos').find({}).toArray(function (err, results) {
					if (err) {
						res.status(500).json({
							error: false,
							todo: []
						});
					} else {
						res.status(200).json({
							error: false,
							todo: results
						});
					}
				});
			}
    	});
  	});
});

app.all('**', function (req, res) {
  	res.send(`404`)
});


app.listen(3000, function () {
	console.log('CORS-enabled web server listening on port 3000')
})
