import mongoose from 'mongoose';

const layoutSchema = new mongoose.Schema({
  i: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  w: {
    type: Number,
    required: true,
  },
  h: {
    type: Number,
    required: true,
  },
  minWidth: {
    type: Number,
    required: true,
  },
  selectedButton: {
    type: String,
    required: true,
  },
  selectedSubButton: {
    type: String,
    required: true,
  },
  textAlignment: {
    type: String,
    enum: ['left', 'center', 'right'],
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  background: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  cover: {
    type: String,
    default: '',
  },
  layout: [layoutSchema],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
