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
  app.delete('/todos/:_id', (req, res) => {
    const _id = req.params._id;
    coll.remove({_id: ObjectID(_id)}, err => {
      err = 'Just testing';
      // If no matching id is found, no error is generated.
      if (err) {
        console.log('server.js delete: sending 500');
        //res.send(err, null, 500);
        res.status(500).send(err);
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
        res.status(500).send(err);
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
        res.status(500).send(err);
      } else if (todo) {
        res.send(todo);
      } else {
        res.sendStatus(404);
      }
    });
  });

  // Modifies a subset of the properties in a given todo.
  app.patch('/todos/:id', (req, res) => {
    const _id = ObjectID(req.params.id);
    const obj = req.body;
    coll.updateOne({_id}, {$set: obj}).then(
      () => res.send(),
      err => res.status(500).send(err));
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
      // This adds a _id property to the object with an assigned id.
      coll.insert(todo, err => {
        if (err) {
          res.status(500).send(err);
        } else {
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
        res.status(500).send(err);
      } else {
        res.send();
      }
    });
  });

  // Toggles the done flag for a given todo.
  app.post('/todos/:id/toggle', (req, res) => {
    const _id = ObjectID(req.params.id);
    coll.findOne({_id}).then(
      todo => {
        coll.updateOne(
          {_id},
          {$set: {done: !todo.done}},
          err => {
            console.log('server.js toggle: err =', err);
            if (err) {
              res.status(500).send(err);
            } else {
              res.send();
            }
          });
      });
  });

  // Update the todo with a given id.
  app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    if (obj) {
      coll.updateOne({_id: ObjectID(id)}, obj, err => {
        if (err) {
          res.status(500).send(err);
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
