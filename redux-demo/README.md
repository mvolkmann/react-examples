This demonstrates an approach to using Redux with react-redux.
It shows an alternate way of implementing a reducer that
doesn't require action type constants and switch statements.
Also, the code that handles each action only needs to return
an object containing the changes to be made to the state,
not an object representing the entire state.
