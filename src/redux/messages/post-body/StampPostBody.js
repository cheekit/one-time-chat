import { Record } from 'immutable';

export class StampPostBody extends Record({
  key: null,
  stamp: null,
  createdAt: null,
  updatedAt: null,
}) {
  constructor(props = {}) {
    const { key, stamp, createdAt, updatedAt} = props;

    super({
      key: key || null,
      stamp: stamp || null,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
