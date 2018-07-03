import React from 'react';

export default ({children}) => (
  <div>
    <div>Before Children</div>
    {children}
    <div>After Children</div>
  </div>
);
