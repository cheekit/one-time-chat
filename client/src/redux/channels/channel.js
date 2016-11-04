import { Record } from 'immutable';

export const Channel = new Record({
  key: null,
  private: false,
  name: null,
  purpose: null,
  invites: []
});
