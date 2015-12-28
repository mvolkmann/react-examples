'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const MongoDb = require('mongodb');
const MongoClient = MongoDb.MongoClient;
const ObjectID = MongoDb.ObjectID;

const app = express();
//app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(bodyParser.json()); // handle Content-Type 'application/json' requests
app.use(bodyParser.text()); // handle Content-Type 'text/plain' requests

MongoClient.connect('mongodb://127.0.0.1:27017/todos', (err, db) => {
  if (err) throw err;

  const coll = db.collection('todos');

  // Deletes the todo with a given id.
  // If no matching id is found, no error is generated.
  // This code uses the variable name "_id" instead of "id"
  // as a reminder that MongoDB names it that way.
  app.delete('/todos/:_id', (req, res) => {
    const _id = req.params._id;
    coll.remove({_id: ObjectID(_id)}).then(
      () => res.send(),
      err => res.status(500).send(err));
  });

  // Gets all todos.
  // Curl command to test:
  // curl -XGET http://localhost:1919/todos
  app.get('/todos', (req, res) => {
    function todoComparator(t1, t2) {
      return t1.text.localeCompare(t2.text);
    }

    coll.find().toArray().then(
      todos => res.send(todos.sort(todoComparator)),
      err => res.status(500).send(err));
  });

  // Gets the todo with a given id.
  // This isn't currently used by todo-list.js.
  app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    coll.findOne(ObjectID(id)).then(
      todo => todo ? res.send(todo) : res.sendStatus(404),
      err => res.status(500).send(err));
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
      // This adds a _id property to the object with the assigned id.
      coll.insert(todo).then(
        // Return URL of new resource.
        () => res.send(req.headers.origin + '/todos/' + todo._id),
        err => res.status(500).send(err));
    } else {
      res.status(400).send('missing todo text in body');
    }
  });

  // Archives todos that have beem marked completed.
  app.post('/todos/archive', (req, res) => {
    coll.remove({done: true}).then(
      () => res.send(),
      err => res.status(500).send(err));
  });

  // Toggles the done flag for a given todo.
  app.post('/todos/:id/toggle', (req, res) => {
    const _id = ObjectID(req.params.id);
    coll.findOne({_id}).
      then(todo => coll.updateOne({_id}, {$set: {done: !todo.done}})).
      then(() => res.send()).
      catch(err => res.status(500).send(err));
  });

  // Update the todo with a given id.
  // This isn't currently used by todo-list.js.
  app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    if (todo) {
      coll.updateOne({_id: ObjectID(id)}, todo).then(
        () => res.send('/todos/' + id), // URL of existing resource
        err => res.status(500).send(err));
    } else {
      res.status(400).send('missing todo JSON object in body');
    }
  });
});

const PORT = 1919;
app.listen(PORT, () => console.log('browse http://localhost:' + PORT));
