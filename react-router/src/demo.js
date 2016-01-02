/* eslint no-unused-vars: 0 */
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {IndexRoute, Lifecycle, Link, Route, Router} from 'react-router';
import './demo.css';

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

/*
const Page2 = () => <div>
  <h1>Page 2</h1>
  <Link to="/">Home</Link>
</div>;
*/
// This version demonstrates use of the Lifecycle mixin.
const Page2 = React.createClass({
  mixins: [Lifecycle],
  routerWillLeave(nextLocation) {
    return 'Are you sure?';
  },
  render() {
    return <div>
      <h1>Page 2</h1>
      <Link to="/">Home</Link>
    </div>;
  }
});

/*
// Defining routes using JSX
// Note that the top route can have path of "/"
// if that component renders content
// that should appear for all routes.
// IndexRoute specifies component
// to be rendered at root path.
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="page1" component={Page1}/>
    <Route path="page2" component={Page2}/>
  </Route>
);
*/

/*
// Defining routes using JavaScript
const routes = {
  path: '/', component: App,
  childRoutes: [
    {onlyActiveOnIndex: true, component: Home},
    {path: 'page1', component: Page1},
    {path: 'page2', component: Page2}
  ]
};
*/
const routes = {
  path: '/', component: App,
  childRoutes: [
    {indexRoute: true, component: Home},
    {path: 'page1', component: Page1},
    {path: 'page2', component: Page2}
  ]
};

ReactDOM.render(
  <Router routes={routes}/>,
  document.getElementById('container'));
