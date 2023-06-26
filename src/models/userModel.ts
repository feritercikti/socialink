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
  type: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  layoutImage: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
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
    avatarUploaded: {
      type: Boolean,
      default: false,
    },
    cover: {
      type: String,
      default: '',
    },
    imageColors: {
      type: Array,
      default: [],
    },
    layout: [layoutSchema],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
