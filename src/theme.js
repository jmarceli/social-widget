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
  shadow: {
    standard: '0 0 4px 0 rgba(172,172,172,0.50)',
  },
  radius: 5,
  button: {
    base: {
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
    },
  },
};

export default theme;
