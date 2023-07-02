import type { ParamMatcher } from '@sveltejs/kit';

// only accept valid languages as a segment in the URL
export const match: ParamMatcher = (param) => {
  return param === 'en' || param === 'id';
};
