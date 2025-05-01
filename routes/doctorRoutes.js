import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// POST /api/doctors/add-doctor
router.post("/add-doctor", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: "Doctor added", doctor: newDoctor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding doctor", error: err.message });
  }
});

// GET /api/doctors/list-doctor-with-filter
router.get("/list-doctor-with-filter", async (req, res) => {
  try {
    const { city, feesMin, feesMax, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (city) filter.city = city;
    if (feesMin || feesMax) {
      filter.fees = {};
      if (feesMin) filter.fees.$gte = parseInt(feesMin);
      if (feesMax) filter.fees.$lte = parseInt(feesMax);
    }

    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Doctor.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      doctors,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: err.message });
  }
});

export default router;
