// @flow
import { loadData } from '../../dataSources';
import type { Profile } from './types.flow';

export const load = (url: string): Promise<Profile> =>
  new Promise((resolve, reject) => {
    // resolve({
    //   imgSrc: './harvey-specter.jpg',
    //   name: 'Harvey Specter',
    //   city: 'New York',
    //   country: 'USA',
    //   likes: 156,
    //   following: 21,
    //   followers: 567,
    //   isLiked: true,
    //   isFollowed: true,
    // });

    // setTimeout(() => {
    const rand = Math.random();
    if (rand > 0.5) {
      reject('Some strange API error');
    } else {
      loadData(url).then(data => resolve(data.profile));
    }
    // }, 500);
  });

// export const mockProfileSave = async (config: State) => new Promise((resolve) => {
//   resolve('OK');
// });
