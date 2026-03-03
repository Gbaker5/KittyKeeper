const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const CatSchema = new Schema(
  {
    ownerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    age: {
      type: Number,
      min: 0,
      max: 30,
    },

    sex: {
      type: String,
      enum: ["male", "female", "unknown"],
      required: true,
    },

    breed: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    color: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    temperament: {
      type: String,
      enum: [
        "very_friendly",
        "friendly",
        "shy",
        "very_shy",
        "independent",
        "aggressive",
      ],
      required: true,
    },

    energyLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    specialNeeds: {
      type: String,
      maxlength: 500,
    },

    medications: {
      type: String,
      maxlength: 500,
    },

    canAdministerMedication: {
      type: Boolean,
      default: false,
    },

    goodWithOtherCats: {
      type: Boolean,
      default: true,
    },

    goodWithDogs: {
      type: Boolean,
      default: true,
    },

    biteHistory: {
      type: Boolean,
      default: false,
    },

    escapeRisk: {
      type: Boolean,
      default: false,
    },

    litterBoxNotes: {
      type: String,
      maxlength: 500,
    },

    feedingSchedule: {
      type: String,
      maxlength: 500,
    },

    indoorOnly: {
      type: Boolean,
      default: true,
    },

    photos: [
      {
        url: String,
        publicId: String, // for Cloudinary later
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔥 helpful index for owner queries
CatSchema.index({ ownerId: 1 });

module.exports = mongoose.model("Cat", CatSchema);