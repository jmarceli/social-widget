// @flow
import type { Theme } from '../../theme';

const topPadding = 12;
const bgTopHeight = 95;

const styles = (theme: Theme) => ({
  root: {
    paddingTop: topPadding,
    paddingBottom: 80,
    width: 320,
    [theme.media.large]: {
      width: 500,
      paddingBottom: 107,
    },
  },
  bgTop: {
    background: theme.color.primary,
    height: bgTopHeight,
    borderRadius: '5px 5px 0 0',
  },
  bgBottom: {
    background: theme.color.white,
    boxShadow: theme.shadow.standard,
    borderRadius: theme.radius,
    paddingBottom: theme.padding.base,
  },
  container: {
    marginTop: -bgTopHeight - topPadding,
    background: 'none',
    paddingLeft: theme.padding.base,
    width: '100%',
    display: 'inline-block',
  },
  profileWrapper: {
    marginBottom: 15,
  },
});

export default styles;
