// @flow
import React from 'react';

type Props = {
  count: number,
  label: string,
};

const Counter = ({ count, label }: Props) => (
  <div>
    <div className="count">{count}</div>
    <div className="label">{label}</div>
  </div>
);

export default Counter;
