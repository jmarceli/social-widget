// @flow
import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {},
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
  classes: { [string]: {} },
  count: number,
  label: string,
};

const Counter = ({ classes, count, label }: Props) => (
  <div className={classes.root}>
    <div className={classes.count}>{count}</div>
    <div className={classes.label}>{label}</div>
  </div>
);

export default injectSheet(styles)(Counter);
