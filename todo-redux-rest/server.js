'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const MongoDb = require('mongodb');
const MongoClient = MongoDb.MongoClient;
const ObjectID = MongoDb.ObjectID;

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

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

  // Adds a todos.
  // Curl commmand to test:
  // curl -XPOST http://localhost:1919/todos \
  //   -H"Content-Type: application/json" \
  //   -d '{"text": "try this"}'
  // Mongo commands to verify:
  // mongo; use todos; db.todos.find()
  app.post('/todos', (req, res) => {
    const obj = req.body;
    if (obj) {
      // This adds a _id property to the object with an assigned id.
      coll.insert(obj, err => {
        if (err) {
          res.send(err, null, 500);
        } else {
          // Return URL of new resource.
          res.send('/todos/' + obj._id);
        }
      });
    } else {
      res.status(400).send('missing todo JSON object in body');
    }
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
