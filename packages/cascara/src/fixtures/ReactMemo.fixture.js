import React, { useState, useCallback, memo } from 'react';

const Button = ({ onClick, children }) => {
  console.log('Button rendered');
  return (
    <button onClick={onClick} type='button'>
      {children}
    </button>
  );
};

const MemoButton = memo(Button);

const WithoutCallback = () => {
  console.log('WithoutCallback rendered');
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  return (
    <div>
      {count}
      <MemoButton onClick={handleIncrement}>+</MemoButton>
    </div>
  );
};

const WithCallback = () => {
  console.log('WithCallback rendered');
  const [count, setCount] = useState(0);
  // Note we are using `count` as a callback here to make sure its value is not stale
  // from the last render. We should be aware of this in our components for values as well.
  const handleIncrement = useCallback(() => setCount((count) => count + 1), []);
  return (
    <div>
      {count}
      <MemoButton onClick={handleIncrement}>+</MemoButton>
    </div>
  );
};

const Fixture = () => (
  <>
    <h2>Prevent Re-Renders With useCallback and React.memo</h2>
    <p>
      This fixture outputs console.log messages showing each time each of these
      components gets rendered and each time the memoized button inside gets
      rendered.
    </p>
    <WithoutCallback />
    <WithCallback />
  </>
);

export default Fixture;
