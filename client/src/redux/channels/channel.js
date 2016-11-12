import { Record } from 'immutable';

export class Channel extends Record({
  key: null,
  userUid: null,
  private: false,
  name: null,
  purpose: null,
  invites: [],
  createdAt: null,
  updatedAt: null
}) {
  constructor(props = {}) {
    const { key, userUid, name, privateFlg, purpose, invites, createdAt, updatedAt } = props;

    super({
      key: key || null,
      userUid: userUid || null,
      name: name || '',
      private: privateFlg || false,
      purpose: purpose || '',
      invites: invites || [],
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
