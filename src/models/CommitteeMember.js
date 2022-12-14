import mongoose, { Schema } from "mongoose";

const CommitteeMemberSchema = new Schema({
  full_name: {
    type: Schema.Types.String,
    required: [true, "Please provide a full name for this member."],
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    required: [true, "Please provide an email for this member."],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please insert a valid email!"],
  },
  is_representative: {
    type: Schema.Types.Boolean,
    required: [true, "Please provide a value for is_representative."],
  },
});

module.exports = mongoose.models.CommitteeMember || mongoose.model("CommitteeMember", CommitteeMemberSchema);
