'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const MongoDb = require('mongodb');
const MongoClient = MongoDb.MongoClient;
const ObjectID = MongoDb.ObjectID;

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json()); // handle Content-Type 'application/json' requests
app.use(bodyParser.text()); // handle Content-Type 'text/plain' requests

MongoClient.connect('mongodb://127.0.0.1:27017/todos', (err, db) => {
  if (err) throw err;

  const coll = db.collection('todos');

  // Deletes the todo with a given id.
  // Curl command to test:
  // curl -XDELETE http://localhost:1919/todos/567b1c2520c448764f0d57d9
  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    coll.remove({_id: ObjectID(id)}, err => {
      // If no matching id is found, no error is generated.
      if (err) {
        res.send(err, null, 500);
      } else {
        res.send();
      }
    });
  });

  // Gets all todos.
  // Curl command to test:
  // curl -XGET http://localhost:1919/todos
  app.get('/todos', (req, res) => {
    coll.find().toArray((err, docs) => {
      if (err) {
        res.send(err, null, 500);
      } else {
        res.send(docs);
      }
    });
  });

  // Gets the todo with a given id.
  // Curl command to test:
  // curl -XGET http://localhost:1919/todos/567b1c2520c448764f0d57d9
  app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    coll.findOne(ObjectID(id), (err, todo) => {
      if (err) {
        res.send(err, null, 500);
      } else if (todo) {
        res.send(todo);
      } else {
        res.sendStatus(404);
      }
    });
  });

  // Adds a todo.
  // Curl commmand to test:
  // curl -XPOST http://localhost:1919/todos \
  //   -d 'some todo text'
  // Mongo commands to verify:
  // mongo; use todos; db.todos.find()
  app.post('/todos', (req, res) => {
    const text = req.body;
    if (text) {
      const todo = {text};
      console.log('server.js post: before insert, todo =', todo);
      // This adds a _id property to the object with an assigned id.
      coll.insert(todo, err => {
        if (err) {
          res.send(err, null, 500);
        } else {
          console.log('server.js post: after insert, todo =', todo);
          // Return URL of new resource.
          res.send(req.headers.origin + '/todos/' + todo._id);
        }
      });
    } else {
      res.status(400).send('missing todo text in body');
    }
  });

  // Archives todos that have beem marked completed.
  app.post('/todos/archive', (req, res) => {
    coll.remove({done: true}, err => {
      if (err) {
        res.send(err, null, 500);
      } else {
        res.send();
      }
    });
  });

  // Archives todos that have beem marked completed.
  app.post('/todos/:id/toggle', (req, res) => {
    //TODO: Finish this.
    coll.update({done: true}, err => {
      if (err) {
        res.send(err, null, 500);
      } else {
        res.send();
      }
    });
  });

  // Update the todo with a given id.
  app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    if (obj) {
      coll.updateOne({_id: ObjectID(id)}, obj, err => {
        if (err) {
          res.send(err, null, 500);
        } else {
          // Return URL of existing resource.
          res.send('/todos/' + id);
        }
      });
    } else {
      res.status(400).send('missing todo JSON object in body');
    }
  });
});

const PORT = 1919;
app.listen(PORT, () => console.log('browse http://localhost:' + PORT));
