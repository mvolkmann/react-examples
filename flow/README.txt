- To type-check these examples using Flow
  * flow start (one time to start Flow server)
  * flow check (each time a change is made)
  * flow stop (one time to stop Flow server)

- To transpile these examples to ES5 and strip type annotations
  * npm start
    - leave it running
    - changes will be transpiled automatically to build directory

- To run these examples
  * node build/{name}.js

- To run examples that start from src/main.js
  and use ES6 modules
  * webpack
  * node build/bundle.js
  * to run Flow on these, may need to just run "flow"
    from top directory and process every file
