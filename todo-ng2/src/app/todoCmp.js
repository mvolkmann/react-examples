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
var TodoCmp = (function () {
    function TodoCmp() {
        this.onDeleteTodo = new angular2_1.EventEmitter();
        this.onToggleDone = new angular2_1.EventEmitter();
    }
    TodoCmp.prototype.toggleDone = function () {
        this.onToggleDone.next(this.todo);
    };
    TodoCmp.prototype.deleteTodo = function () {
        this.onDeleteTodo.next(this.todo.id);
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], TodoCmp.prototype, "todo");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], TodoCmp.prototype, "onDeleteTodo");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], TodoCmp.prototype, "onToggleDone");
    TodoCmp = __decorate([
        angular2_1.Component({
            selector: 'todo',
            template: "\n    <li>\n      <input type=\"checkbox\"\n        [checked]=\"todo.done\"\n        (change)=\"toggleDone()\"/>\n      <span [ng-class]=\"'done-' + todo.done\">{{todo.text}}</span>\n      <button (click)=\"deleteTodo()\">Delete</button>\n    </li>",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TodoCmp);
    return TodoCmp;
})();
exports.TodoCmp = TodoCmp;
//# sourceMappingURL=todoCmp.js.map