import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

const htmlString = '<b>Apples</b> are <span style="color: red">red</span>!';

const MyComponent = () =>
  <div dangerouslySetInnerHTML={{__html: htmlString}}/>;

ReactDOM.render(
  <MyComponent/>,
  document.getElementById('content'));
