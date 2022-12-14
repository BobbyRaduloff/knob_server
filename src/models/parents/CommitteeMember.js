import { Schema } from "mongoose";

export default new Schema({
  full_name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете трите имена на член на комитета."],
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете имейл на член на комитета."],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Моля предоставете валиден имейл."],
  },
  is_representative: {
    type: Schema.Types.Boolean,
    required: [true, "Моля предоставете информация за дали член на комитета е представител."],
  },
});
