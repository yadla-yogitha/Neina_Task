import { Booking } from "../models/booking.js";
import { expressError } from "../utils/expressError.js";

const addBookingController = async (req, res) => {
    let { name, contact, date, time, numberOfguests } = req.body;

    let existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
        throw new expressError(400, "This slot is already booked");
    }

    let newBook = new Booking({
        name: name,
        contact: contact,
        date: date,
        time: time,
        numberOfGuests: numberOfguests,
    });

    let data = await newBook.save();
    res.status(200).send({ success: true, message: "This slot is booked", data });
};

const getAllBookingTableController = async (req, res) => {
    const data = await Booking.find();
    if (!data) {
        throw new expressError(401, "Booking not Found");
    }
    res.status(200).send({ success: true, message: "All booking list is fetched", data });
};

const getBookingController = async (req, res) => {
    let { id } = req.params;
    let booking = await Booking.findById(id);
    if (!booking) {
        throw new expressError(404, "Booking not found");
    }

    res.status(200).send({ success: true, message: "Booking slot has fetched", booking });
};

const getBookingAvailbaleController = async (req, res) => {
    const { date } = req.query;
    console.log('Received date:', date);  // Logging the received date for debugging

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
    
    const timeSlots = [
        '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00'
    ];

    const bookings = await Booking.find({
        date: { $gte: startOfDay, $lte: endOfDay },
    });

    const bookedSlots = bookings.map((booking) => booking.time);
    const availableSlots = timeSlots.filter((slot) => !bookedSlots.includes(slot));

    console.log('Available slots:', availableSlots);  // Logging available slots

    res.status(200).send({ success: true, message: "Available booking slots fetched", availableSlots });
};

const deleteBookingController = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let booking = await Booking.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Booking slot is checked out" });
};

export { addBookingController, getBookingController, deleteBookingController, getBookingAvailbaleController, getAllBookingTableController };
