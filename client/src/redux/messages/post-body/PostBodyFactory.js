import {
  StringPostBody,
  StampPostBody
} from '../post-body';

export const PostBodyFactory = {
  createFromObject: (obj) => {
    if (obj.stampId) {
      return new StampPostBody(obj);
    } else {
      return new StringPostBody(obj);
    }
  }
};
