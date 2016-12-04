import { Record } from 'immutable';

export class Channel extends Record({
  key: null,
  userUid: null,
  private: false,
  name: null,
  purpose: null,
  invites: {},
  members: {},
  createdAt: null,
  updatedAt: null
}) {
  constructor(props = {}) {
    const { key, userUid, name, privateFlg, purpose, invites, members, createdAt, updatedAt } = props;

    super({
      key: key || null,
      userUid: userUid || null,
      name: name || '',
      private: privateFlg || false,
      purpose: purpose || '',
      invites: invites || {},
      members: members || {},
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
