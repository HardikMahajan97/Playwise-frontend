import {useState} from "react";
import {Box, Typography, Button, Grid} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";

export default function BookingDetails(){

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [date, setDate] = useState(null);
    const [court, setCourt] = useState([]);

    const slots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

    const handleDateChange = (newValue) => {
        setDate(newValue);
        console.log(newValue?.format("DD/MM/YYYY"));
    }

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
        console.log(slot);
    };

    const handleBook = async (e) => {
        e.preventDefault();
        try{

        }catch(e){

        }
    }


    return(
        <>
            {/*Slot*/}
            <div className="w-screen">
                <div
                    className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-32 text-center shadow-xl shadow-gray-300">
                    <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book Your slot</h1>
                    <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
                         src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                         alt=""/>
                </div>

                <div className="mx-auto grid max-w-screen-lg px-6 pb-20">

                    {/*Select Date:Drop down*/}
                    <div className={"p-4"}>
                        <Typography variant="h5" className="mt-8 text-xl font-bold text-blue-900">Select the
                            date:</Typography>
                        <br/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="MM/DD/YYYY"
                                value={date}
                                // onChange={(newValue) => date(newValue)}
                                onChange={handleDateChange}
                                className={"block w-1/3 rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm"}
                            />
                        </LocalizationProvider>
                    </div>

                    {/*Slot Selection*/}
                    <div className="">
                        <p className="mt-8 text-xl font-bold text-blue-900">Select a time</p>
                        <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                            {slots.map((slot, index) => (
                                <button
                                    key={index}
                                    className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${
                                        selectedSlot === slot ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"
                                    }`}
                                    onClick={() => handleSlotSelection(slot)}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/*Court Selection*/}
                    <div>

                    </div>
                    <button
                        type={"submit"}
                        action={handleBook}
                        className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1">Book
                        Now
                    </button>
                </div>
            </div>
            <script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></script>


        </>
    );
}