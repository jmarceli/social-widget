// @flow
import React from 'react';
import injectSheet from 'react-jss';
import ContentLoader from 'react-content-loader';

const styles = theme => ({
  container: {
    display: 'inline-block',
    textAlign: 'left',
    minWidth: 58,
  },
  count: {
    fontSize: 24,
    lineHeight: '27px',
    height: 27,
    color: theme.color.secondary,
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    lineHeight: '12px',
    height: 12,
    color: '#343e00',
  },
});

type Props = {
  className: string,
  classes: { [string]: {} },
  count: number,
  label: string,
  isLoading: boolean,
};

const Counter = ({ isLoading, className, classes, count, label }: Props) => (
  <div className={className}>
    <div className={classes.container}>
      <div className={classes.count}>
        {isLoading ? (
          <ContentLoader width={58} height={24}>
            <rect x="0" y="0" rx="5" ry="5" width="58" height="24" />
          </ContentLoader>
        ) : (
          count
        )}
      </div>
      <div className={classes.label}>
        {isLoading ? (
          <ContentLoader width={58} height={10}>
            <rect x="0" y="0" rx="5" ry="5" width="58" height="10" />
          </ContentLoader>
        ) : (
          label
        )}
      </div>
    </div>
  </div>
);

export default injectSheet(styles)(Counter);
