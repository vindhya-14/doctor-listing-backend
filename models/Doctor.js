import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  city: String,
  fees: Number,
});

export default mongoose.model("Doctor", doctorSchema);
