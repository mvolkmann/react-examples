/* eslint no-unused-vars: 0 */
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {Link, Route, Router} from 'react-router';

class App extends React.Component {
  render() {
    return <div>
      {/*} Could have content here for common content on all pages. {*/}
      {/*} renders matching child route component {*/}
      {this.props.children}
    </div>;
  }
}

const Home = () => <div>
  <h1>Home</h1>
  <Link to="/page1">Page 1</Link>
  &nbsp;
  <Link to="/page2">Page 2</Link>
</div>;

const Page1 = () => <div>
  <h1>Page 1</h1>
  <p>Use browser back button to return to home page.</p>
</div>;

const Page2 = () => <div>
  <h1>Page 2</h1>
  <Link to="/">Home</Link>
</div>;

// Defining routes using JSX
// Note that the top route can have path of "/"
// if that component renders content
// that should appear for all routes.
/*
const routes = (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="page1" component={Page1}/>
    <Route path="page2" component={Page2}/>
  </Route>
);
*/

// Defining routes using JavaScript
const routes = {
  component: App,
  childRoutes: [
    {path: '/', component: Home},
    {path: 'page1', component: Page1},
    {path: 'page2', component: Page2}
  ]
};

ReactDOM.render(
  <Router routes={routes}/>,
  document.getElementById('container'));
