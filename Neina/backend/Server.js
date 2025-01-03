import express from 'express';
import { connectToDb } from './utils/initDB.js';
import { addBookingRoute, deletBookingRoute, getAllBookingTableRoute, getBookingAvailableRoute, getBookingRoute } from './routes/bookingRoute.js';
import cors from 'cors';
import { expressError } from './utils/expressError.js';

const app=express();
let port=3000;

app.use(cors());
app.use(express.json());

connectToDb();

//Booking
app.use("/", addBookingRoute);
app.use("/", getBookingRoute);
app.use("/", getAllBookingTableRoute);
app.use("/", getBookingAvailableRoute);
app.use("/", deletBookingRoute);


app.use("*", (req, res, next)=>{
    next(new expressError(404, "page not found"));
})

app.use((err, req, res, next)=>{
    const{statusCode=200, message="someting went wrong"} = err;
    res.status(statusCode).send({success: true, message: message});
});
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})