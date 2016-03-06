// ESLint can't detect when a variable is only used in JSX.
/* eslint no-unused-vars: 0 */

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

const {func, object} = React.PropTypes;
TodoList.propTypes = {
  iTodos: object.isRequired,
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired
};

export default TodoList;
