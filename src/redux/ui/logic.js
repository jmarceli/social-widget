// @flow
import WebFont from 'webfontloader';

export const loadFonts = (): Promise<void> =>
  new Promise((resolve, reject) => {
    // https://github.com/typekit/webfontloader
    WebFont.load({
      google: {
        families: ['Montserrat:400,600', 'sans-serif'],
      },
      fontactive: () => {
        // For fonts loaded from supported providers, the fontactive event will be triggered
        resolve();
      },
      fontinactive: () => {
        // The fontinactive event will be triggered after 5 seconds if the font fails to render
        reject();
      },
    });
  });
