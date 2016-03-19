import Immutable from 'immutable';
import React from 'react';
import Todo from './todo';

class TodoList extends React.Component {
  /*
  shouldComponentUpdate(nextProps) {
    return this.props.iTodos !== nextProps.iTodos;
  }
  */

  render() {
    console.log('todo-list.js render: entered');
    const {iTodos, onDeleteTodo, onToggleDone} = this.props;
    return (
      <ul className="unstyled">
        {
          iTodos.map(iTodo => {
            const _id = iTodo.get('_id');
            return (
              <Todo key={_id} iTodo={iTodo}
                onDeleteTodo={() => onDeleteTodo(_id)}
                onToggleDone={() => onToggleDone(iTodo)}/>
            );
          }).valueSeq()
        }
      </ul>
    );
  }
}

const {func, instanceOf} = React.PropTypes;
TodoList.propTypes = {
  iTodos: instanceOf(Immutable.OrderedMap).isRequired,
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired
};

export default TodoList;
