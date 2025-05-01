const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listDoctors = async (req, res) => {
  try {
    const { city, feesMin, feesMax, page = 1, limit = 5 } = req.query;
    const filter = {};

    if (city) filter.city = city;
    if (feesMin && feesMax) filter.fees = { $gte: feesMin, $lte: feesMax };

    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Doctor.countDocuments(filter);

    res.json({ doctors, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
