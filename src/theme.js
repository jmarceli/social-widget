// @flow
export type Theme = {
  [string]: any,
};

const breakpoints = {
  minDesktop: 500,
};

const font = {
  fontFamily: "'Montserrat', 'sans-serif'",
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
};

const theme = {
  font,
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
      ...font,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
    },
  },
  utils: {
    clearFloats: {
      content: '""',
      display: 'table',
      clear: 'both',
    },
  },
  padding: {
    base: 17,
  },
};

export default theme;
