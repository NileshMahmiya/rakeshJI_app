import PoojaBooking from "../models/poojaBooking.model.js";

// @desc    Create a new booking
// @route   POST /api/v1/bookings
export const createBooking = async (req, res) => {
  try {
    const { poojaName, yajmanName, yajmanPhone, startDate, endDate, remarks } = req.body;

    const booking = await PoojaBooking.create({
      user: req.user._id,
      poojaName,
      yajmanName,
      yajmanPhone,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : new Date(startDate),
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Pooja booking saved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status, earnings (Lifafa & Extra Pesa), or details
// @route   PUT /api/v1/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const { status, earnings, remarks, poojaName, yajmanName, yajmanPhone } = req.body;

    const booking = await PoojaBooking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (poojaName) booking.poojaName = poojaName;
    if (yajmanName) booking.yajmanName = yajmanName;
    if (yajmanPhone) booking.yajmanPhone = yajmanPhone;
    if (remarks !== undefined) booking.remarks = remarks;

    if (status) {
      booking.status = status;
    }

    if (earnings) {
      if (earnings.lifafa !== undefined) booking.earnings.lifafa = Number(earnings.lifafa);
      if (earnings.extraPesa !== undefined) booking.earnings.extraPesa = Number(earnings.extraPesa);
      if (earnings.expenses !== undefined) booking.earnings.expenses = Number(earnings.expenses);
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bookings and analytical metrics (Combined + Individual breakdown)
// @route   GET /api/v1/bookings/metrics
export const getBookingMetrics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = { user: req.user._id };

    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const bookings = await PoojaBooking.find(query).sort({ startDate: -1 });

    let totalLifafa = 0;
    let totalExtraPesa = 0;
    let totalExpenses = 0;
    let completedPojasCount = 0;
    let totalDaysWorked = 0;

    bookings.forEach((b) => {
      if (b.status === "completed") {
        const lifafa = b.earnings.lifafa || 0;
        const extraPesa = b.earnings.extraPesa || 0;
        const expenses = b.earnings.expenses || 0;

        totalLifafa += lifafa;
        totalExtraPesa += extraPesa;
        totalExpenses += expenses;
        completedPojasCount += 1;

        const start = new Date(b.startDate);
        const end = new Date(b.endDate || b.startDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        totalDaysWorked += diffDays;
      }
    });

    const combinedEarnings = totalLifafa + totalExtraPesa;
    const netEarnings = combinedEarnings - totalExpenses;

    res.status(200).json({
      success: true,
      metrics: {
        totalBookings: bookings.length,
        completedPojasCount,
        totalDaysWorked,
        financials: {
          totalLifafa,         // Single (Lifafa only)
          totalExtraPesa,      // Single (Extra Pesa only)
          combinedEarnings,    // Both combined
          totalExpenses,
          netEarnings,
        },
      },
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a mistaken or unwanted booking
// @route   DELETE /api/v1/bookings/:id
export const deleteBooking = async (req, res) => {
  try {
    const booking = await PoojaBooking.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};