import { Record } from 'immutable';
import { PostBodyFactory } from './post-body';

export class Message extends Record({
  key: null,
  channelId: null,
  from: null,
  to: null,
  body: null,
  isRead: false,
  createdAt: null,
  updatedAt: null,
}) {
  constructor(props = {}) {
    const { key, channelId, sentFrom, sentTo, body, isRead, createdAt, updatedAt } = props;
    
    super({
      key: key || null,
      channelId: channelId || null,
      sentFrom: sentFrom || '',
      sentTo: sentTo || '',
      body: PostBodyFactory.createFromObject(body),
      isRead: isRead || false,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    });
  }
}
