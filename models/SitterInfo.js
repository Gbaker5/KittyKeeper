const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const SitterProfileSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one sitter profile per user
      index: true,
    },

    // 📍 Location (for geo search)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
      city: String,
      state: String,
      zip: String,
    },

    // 🧠 Experience
    experienceYears: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },

    ownsCats: {
      type: Boolean,
      default: false,
    },

    ownsDogs: {
      type: Boolean,
      default: false,
    },

    experienceWithShyCats: {
      type: Boolean,
      default: false,
    },

    experienceWithAggressiveCats: {
      type: Boolean,
      default: false,
    },

    acceptsKittens: {
      type: Boolean,
      default: true,
    },

    acceptsSeniorCats: {
      type: Boolean,
      default: true,
    },

    acceptsSpecialNeeds: {
      type: Boolean,
      default: false,
    },

    canAdministerMedication: {
      type: Boolean,
      default: false,
    },

    // 🏠 Home environment
    homeType: {
      type: String,
      enum: ["apartment", "house", "townhome", "other"],
      required: true,
    },

    hasChildren: {
      type: Boolean,
      default: false,
    },

    smokingHome: {
      type: Boolean,
      default: false,
    },

    hasSecureWindows: {
      type: Boolean,
      default: true,
    },

    // 🛎️ Services offered
    services: {
      overnight: { type: Boolean, default: false },
      dropIn: { type: Boolean, default: true },
      boarding: { type: Boolean, default: false },
    },

    pricing: {
      pricePerDay: {
        type: Number,
        min: 0,
      },
      dropInPrice: {
        type: Number,
        min: 0,
      },
      overnightPrice: {
        type: Number,
        min: 0,
      },
    },

    maxCatsAtOnce: {
      type: Number,
      min: 1,
      max: 20,
      default: 2,
    },

    // 📸 Updates & communication
    photoUpdateFrequency: {
      type: String,
      enum: ["none", "daily", "twice_daily", "every_visit"],
      default: "daily",
    },

    responseTimeHours: {
      type: Number,
      min: 0,
      max: 72,
    },

    bio: {
      type: String,
      maxlength: 1200,
    },

    photos: [
      {
        url: String,
        publicId: String,
      },
    ],

    // ⭐ Review cache (VERY IMPORTANT for performance)
    ratingAvg: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    repeatClientCount: {
      type: Number,
      default: 0,
    },

    // 🛡️ Trust & safety
    isVerified: {
      type: Boolean,
      default: false,
    },

    backgroundCheckCompleted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔥 REQUIRED for geo queries
SitterProfileSchema.index({ location: "2dsphere" });

// 🔥 helpful compound index for search later
SitterProfileSchema.index({
  ratingAvg: -1,
  reviewCount: -1,
});

module.exports = mongoose.model("SitterProfile", SitterProfileSchema); 