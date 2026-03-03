const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const BookingSchema = new Schema(
  {
    // 👥 Parties
    ownerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sitterId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🐱 Cats involved in booking
    catIds: [
      {
        type: Types.ObjectId,
        ref: "Cat",
        required: true,
      },
    ],

    // 🛎️ Service details
    serviceType: {
      type: String,
      enum: ["drop_in", "overnight", "boarding"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    // 💰 Pricing snapshot (VERY IMPORTANT — never rely on sitter profile later)
    pricingSnapshot: {
      pricePerDay: Number,
      dropInPrice: Number,
      overnightPrice: Number,
      totalPrice: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },

    // 📝 Owner message at request time
    initialMessage: {
      type: String,
      maxlength: 1000,
    },

    // 🔄 STATUS STATE MACHINE (critical)
    status: {
      type: String,
      enum: [
        "pending",      // owner requested
        "accepted",     // sitter accepted
        "declined",     // sitter declined
        "cancelled",    // either party cancelled
        "in_progress",  // booking started
        "completed",    // finished normally
        "disputed",     // issue reported
      ],
      default: "pending",
      index: true,
    },

    // ❌ Cancellation tracking
    cancelledBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    cancellationReason: {
      type: String,
      maxlength: 500,
    },

    cancelledAt: Date,

    // 🕒 Lifecycle timestamps
    acceptedAt: Date,
    declinedAt: Date,
    startedAt: Date,
    completedAt: Date,

    // ⭐ Review tracking (prevents duplicates)
    ownerReviewed: {
      type: Boolean,
      default: false,
    },

    sitterReviewed: {
      type: Boolean,
      default: false,
    },

    // 💳 Payment readiness (Phase 2 ready)
    paymentStatus: {
      type: String,
      enum: [
        "unpaid",
        "authorized",
        "paid",
        "refunded",
        "failed",
      ],
      default: "unpaid",
    },

    paymentIntentId: String, // Stripe later

    // 💬 Link to conversation
    conversationId: {
      type: Types.ObjectId,
      ref: "Conversation",
    },

    // 🛡️ Safety / issues
    hasIncidentReport: {
      type: Boolean,
      default: false,
    },

    incidentNotes: {
      type: String,
      maxlength: 1000,
    },

    // 🔍 Soft delete support
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema); 