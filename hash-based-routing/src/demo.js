import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';

const Home = () => <div>
  <h1>Home</h1>

  {/* Demonstrate hash change via a link. */}
  <a href="#page1">Page 1</a>
  {' '}

  {/* Demonstrate hash change via code. */}
  <button onClick={() => location.hash = '#page2'}>Page 2</button>
</div>;

const Page1 = () => <div>
  <h1>Page 1</h1>
  <p>Use browser back button to return to home page.</p>
</div>;

const Page2 = () => <div>
  <h1>Page 2</h1>
  <a href="#">Home</a>
</div>;

function render() {
  const hash = location.hash;
  // Can perform validation here to prevent certain navigations
  // or redirect to a different hash.

  // Select component to render based on hash portion of URL.
  const jsx =
    hash === '#page1' ? <Page1/> :
    hash === '#page2' ? <Page2/> :
    <Home/>; // default page; could use a custom 404 page
  ReactDOM.render(jsx, document.getElementById('content'));
  // Browser back and forward buttons will work.
  // User can change hash in browser address bar.

  // Another option is to create a
  // Flux/Redux action for changing the hash
  // so it can be part of the session history.
}

window.addEventListener('hashchange', render);
render();
