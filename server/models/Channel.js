'use strict';

import mongoose from 'mongoose';

const channelSchema = mongoose.Schema({
  name: { type:String, unique: true },
  id: String,
  private: Boolean,
  between: Array
});

module.exports = mongoose.model('Channel', channelSchema);
