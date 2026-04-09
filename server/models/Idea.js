import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  report: {
    problem: String,
    customer: String,
    market: String,
    competitor: [{
      name: String,
      differentiation: String
    }],
    tech_stack: [String],
    risk_level: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    profitability_score: Number,
    justification: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Idea = mongoose.model("Idea", IdeaSchema);