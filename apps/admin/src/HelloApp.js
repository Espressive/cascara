import React from 'react';

export function HelloApp({ greeting, name }) {
  return <h1>{greeting}, {name}!</h1>;
}