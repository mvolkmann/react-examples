var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var todoCmp_1 = require("./todoCmp");
var TodoListCmp = (function () {
    function TodoListCmp() {
        this.state = {
            todos: [
                TodoListCmp.createTodo('learn Angular 2', true),
                TodoListCmp.createTodo('build an Angular 2 app')
            ]
        };
    }
    TodoListCmp.createTodo = function (text, done) {
        if (done === void 0) { done = false; }
        return { id: ++TodoListCmp.lastId, text: text, done: done };
    };
    Object.defineProperty(TodoListCmp.prototype, "uncompletedCount", {
        get: function () {
            return this.state.todos.reduce(function (count, todo) { return todo.done ? count : count + 1; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    TodoListCmp.prototype.onAddTodo = function () {
        var newTodo = TodoListCmp.createTodo(this.state.todoText);
        this.state.todoText = '';
        this.state.todos = this.state.todos.concat(newTodo);
    };
    TodoListCmp.prototype.onArchiveCompleted = function () {
        this.state.todos = this.state.todos.filter(function (t) { return !t.done; });
    };
    TodoListCmp.prototype.onChange = function (name, event) {
        this.state[name] = event.target.value;
    };
    TodoListCmp.prototype.onDeleteTodo = function (todoId) {
        this.state.todos = this.state.todos.filter(function (t) { return t.id !== todoId; });
    };
    TodoListCmp.prototype.onToggleDone = function (todo) {
        var id = todo.id;
        this.state.todos = this.state.todos.map(function (t) { return t.id === id ?
            { id: id, text: todo.text, done: !todo.done } :
            t; });
    };
    TodoListCmp.lastId = 0;
    TodoListCmp = __decorate([
        angular2_1.Component({
            selector: 'todo-list',
            template: "<div>\n    <h2>To Do List</h2>\n    <div>\n      {{uncompletedCount}} of {{state.todos.length}} remaining\n      <button (click)=\"onArchiveCompleted()\">Archive Completed</button>\n    </div>\n    <br/>\n    <form>\n      <input type=\"text\" size=\"30\" autoFocus\n        placeholder=\"enter new todo here\"\n        [ng-model]=\"state.todoText\"\n        (input)=\"onChange('todoText', $event)\"/>\n      <button [disabled]=\"!state.todoText\" (click)=\"onAddTodo()\">Add</button>\n    </form>\n    <ul class=\"unstyled\">\n      <todo *ng-for=\"#todo of state.todos\" [todo]=\"todo\"\n        (on-delete-todo)=\"onDeleteTodo($event)\"\n        (on-toggle-done)=\"onToggleDone($event)\"></todo>\n    </ul>\n  </div>",
            directives: [angular2_1.FORM_DIRECTIVES, todoCmp_1.TodoCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], TodoListCmp);
    return TodoListCmp;
})();
exports.TodoListCmp = TodoListCmp;
angular2_1.bootstrap(TodoListCmp);
//# sourceMappingURL=todoListCmp.js.map