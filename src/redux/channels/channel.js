import { Record } from 'immutable';

export class Channel extends Record({
  key: null,
  userUid: null,
  private: false,
  name: null,
  purpose: null,
  invites: {},
  members: {},
  delete: false,
  createdAt: null,
  updatedAt: null
}) {
  constructor(props = {}) {
    const { key, userUid, name, privateFlg, purpose, invites, members, createdAt, updatedAt, deleteFlg } = props;

    super({
      key: key || null,
      userUid: userUid || null,
      name: name || '',
      private: privateFlg || false,
      purpose: purpose || '',
      invites: invites || {},
      members: members || {},
      delete: deleteFlg || false,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
