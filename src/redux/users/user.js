import { Record } from 'immutable';

export class User extends Record({
  id: null,
  name: '',
  photoUrl: '',
  joinRoom: {},
  createdAt: null,
  updatedAt: null
}) {
  constructor(props = {}) {
    const { id, name, photoUrl, joinRoom, createdAt, updatedAt } = props;

    super({
      id: id || null,
      name: name || '',
      photoUrl: photoUrl || '',
      joinRoom: joinRoom || {},
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
