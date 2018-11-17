// @flow
export type ProfileData = {
  imgSrc: string,
  name: string,
  city: string,
  country: string,
  followers: number,
  likes: number,
  following: number,
};

// Add fetch polyfill if legacy browsers support is required
// see: https://github.com/github/fetch#browser-support
export const loadData = async (url: string): Promise<ProfileData> => {
  const res = await fetch(url);
  const jsonData = await res.json();
  return jsonData;
};
