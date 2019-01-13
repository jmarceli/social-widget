// @flow
import type { Theme } from '../../theme';

export const animationTimeout = 500; // in ms
const styles = (theme: Theme) => ({
  root: {
    boxShadow: theme.shadow.standard,
    borderRadius: theme.radius,
    width: 283,
    [theme.media.large]: {
      width: 466,
    },
  },
  header: {
    textAlign: 'center',
    [theme.media.large]: {
      textAlign: 'left',
    },
  },
  btnToggle: {
    ...theme.button.base,
    color: theme.color.secondary,
    fontSize: 14,
    lineHeight: '18px',
    padding: 25,
    textDecoration: 'underline',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  commentsPanel: {
    overflow: 'hidden',
    transition: `all ${animationTimeout / 1000}s`,
    height: 0,
  },
  commentsPanelIn: {
    // 10 is an arbitrary value which gives some
    // space for shrinking input label
    // total_height - toggle_btn_height (2*25+18)
    height: 591 - 68 + 10,
    marginBottom: -62.5 - 10 - theme.padding.base,
    [theme.media.large]: {
      height: 667 - 68,
      marginBottom: -103 - theme.padding.base,
    },
  },
  scrollerWrapper: {
    // based on design
    paddingBottom: 13,
    paddingTop: 12,
    [theme.media.large]: {
      paddingBottom: 22,
      paddingTop: 8,
    },
  },
  scroller: {
    position: 'relative',
    overflow: 'scroll',
    height: 440,
    [theme.media.large]: {
      height: 470,
    },
  },
});

export default styles;
