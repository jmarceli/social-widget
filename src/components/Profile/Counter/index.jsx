// @flow
import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
  container: {
    display: 'inline-block',
    textAlign: 'left',
  },
  count: {
    fontSize: 24,
    color: theme.color.secondary,
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    color: '#343e00',
  },
});

type Props = {
  className: string,
  classes: { [string]: {} },
  count: number,
  label: string,
};

const Counter = ({ className, classes, count, label }: Props) => (
  <div className={className}>
    <div className={classes.container}>
      <div className={classes.count}>{count}</div>
      <div className={classes.label}>{label}</div>
    </div>
  </div>
);

export default injectSheet(styles)(Counter);
