// @flow
import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {},
  count: {
    color: theme.color.secondary,
  },
  label: {
    color: theme.color.primary,
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
