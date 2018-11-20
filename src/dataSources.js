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
export type Comment = {
  imgSrc: string,
  author: string,
  pubTimestamp: number,
  content: string,
};
export type SourceData = {
  profile: ProfileData,
  commentList: Comment[],
};

// Add fetch polyfill if legacy browsers support is required
// see: https://github.com/github/fetch#browser-support
export const loadData = async (url: string): Promise<SourceData> => {
  const res = await fetch(url);
  const jsonData = await res.json();
  if (jsonData.commentList && jsonData.commentList.length) {
    jsonData.commentList.sort(
      (a, b) => (a.pubTimestamp <= b.pubTimestamp ? -1 : 1),
    );
  }
  return jsonData;
};
