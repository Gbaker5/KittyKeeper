const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const OwnerProfileSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
      index: true,
    },

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

    homeType: {
      type: String,
      enum: ["apartment", "house", "townhome", "other"],
      required: true,
    },

    hasOtherPets: {
      type: Boolean,
      default: false,
    },

    otherPetsDetails: {
      type: String,
      maxlength: 500,
    },

    providesSupplies: {
      type: Boolean,
      default: true,
    },

    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },

    bio: {
      type: String,
      maxlength: 1000,
    },

    // ⭐ future trust features
    isVerified: {
      type: Boolean,
      default: false,
    },

    // ⭐ stats cache (for fast reads later)
    totalBookings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 🔥 REQUIRED for geo search later
OwnerProfileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("OwnerProfile", OwnerProfileSchema);