import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

const Repeater = ({users}) =>
  <ul>
    {
      users.map(user =>
       <li>{user.name} is {user.age} years old.</li>)
    }
  </ul>;

const users = [
  {name: 'Jilles', age: 21},
  {name: 'Todd', age: 24},
  {name: 'Lisa', age: 18}
];

ReactDOM.render(
  <Repeater users={users}/>,
  document.getElementById('container'));
