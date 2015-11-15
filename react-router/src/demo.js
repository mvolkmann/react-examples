/* eslint no-unused-vars: 0 */
import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router';

class App extends React.Component {
  componentWillMount() {
    console.log('this.props =', this.props);
  }

  /*
  goTo(path) {
    //this.transitionTo(path);
    this.props.history.pushState(null, path);
  }
  */

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link class="btn btn-default" to="/page1">Page 1</Link>
        &nbsp;
        <Link to="/page2">Page 2</Link>
        {/* THE NEXT LINE IS KEY! */}
        {this.props.children}
      </div>
    );
  }
}

const Page1 = React.createClass({ //eslint-disable-line
  render() {
    return <h1>Page 1</h1>;
  }
});

/*
const Page1 = props => ( //eslint-disable-line
  <div>
    <h1>Page 1</h1>
    <button onClick="props.goToPage2">
      Page 2
    </button>
  </div>
);
*/

const Page2 = () => ( //eslint-disable-line
  <div>
    <h1>Page 2</h1>
  </div>
);

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    {
      path: 'page1',
      component: Page1,
      onEnter: () => {
        console.log('entered page1 route');
      },
      onLeave: () => {
        console.log('leaving page1 route');
      }
    },
    {
      path: 'page2',
      component: Page2,
      onEnter: () => {
        console.log('entered page2 route');
      },
      onLeave: () => {
        console.log('leaving page2 route');
      }
    }
  ],
  onEnter: () => {
    console.log('entered top route');
  },
  onLeave: () => {
    console.log('leaving top route');
  }
};
/*
const routes = (
  <Route path="/" component={App}>
    <Route path="page1" component={Page1}/>
    <Route path="page2" component={Page2}/>
  </Route>
);
*/

/*
ReactDOM.render(
  <Router history={createBrowserHistory()} routes={routes}/>,
  document.getElementById('content'));
*/
ReactDOM.render(
  <Router routes={routes}/>,
  document.getElementById('content'));
