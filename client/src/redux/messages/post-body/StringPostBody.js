import { Record } from 'immutable';

export class StringPostBody extends Record({
  key: null,
  link: null,
  photos: null,
  content: '',
  createdAt: null,
  updatedAt: null,
}) {
  constructor(props = {}) {
    const { key, link, photos, content, createdAt, updatedAt} = props;

    super({
      key: key || null,
      link: link || null,
      photos: photos || null,
      content: content || '',
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
