// @flow
export type Theme = {
  [string]: any,
};

const breakpoints = {
  minDesktop: 500,
};

const theme = {
  color: {
    primary: '#002c71',
    primaryLight: '#8298b9',
    secondary: '#ffa640',
    white: '#fff',
  },
  media: {
    large: `@media (min-width: ${breakpoints.minDesktop}px)`,
  },
};

export default theme;
