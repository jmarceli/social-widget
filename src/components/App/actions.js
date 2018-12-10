// @flow
import WebFont from 'webfontloader';
import { loadData } from '../../dataSources';

// loads font from Google fonts
export const fontLoad = (wrapType: string => string) => (
  dispatch: ({}) => void,
) => {
  dispatch({ type: wrapType('fontLoad') });
  // each font width is calculated as a separate font
  const totalFonts = 2;
  let loadedFontsCount = 0;

  WebFont.load({
    google: {
      families: ['Montserrat:400,600', 'sans-serif'],
    },
    fontactive: () => {
      loadedFontsCount++;
      if (loadedFontsCount >= totalFonts) {
        dispatch({ type: wrapType('fontLoadSuccess') });
      }
    },
  });
};

// loads JSON data from external URL
export const dataLoad = (wrapType: string => string, url: string) => async (
  dispatch: ({}) => void,
) => {
  dispatch({ type: wrapType('dataLoad') });
  const result = await loadData(url);
  dispatch({ type: wrapType('dataLoadSuccess'), payload: result });
};

export default {
  fontLoad,
  dataLoad,
};
