import express from 'express';
import { addBookingController, deleteBookingController, getAllBookingTableController, getBookingAvailbaleController, getBookingController } from '../controllers/bookingController.js';
import { handleAsyncError } from '../middleware/wrapAsync.js';
const router=express.Router();

const addBookingRoute=router.post("/booking", handleAsyncError(addBookingController));
const getBookingRoute=router.get("/booking/:id", handleAsyncError(getBookingController));
const getBookingAvailableRoute=router.get("/availableslot", handleAsyncError(getBookingAvailbaleController));
const getAllBookingTableRoute=router.get("/all", handleAsyncError(getAllBookingTableController));
const deletBookingRoute=router.delete("/booking/:id", handleAsyncError(deleteBookingController));

export{addBookingRoute, getBookingRoute, deletBookingRoute, getBookingAvailableRoute, getAllBookingTableRoute};