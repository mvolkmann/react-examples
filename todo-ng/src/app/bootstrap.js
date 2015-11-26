var angular2_1 = require('angular2/angular2');
var todoListCmp_1 = require('./todoListCmp');
angular2_1.bootstrap(todoListCmp_1.TodoListCmp)
    .then(function () { return console.log('Bootstrap success'); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=bootstrap.js.map