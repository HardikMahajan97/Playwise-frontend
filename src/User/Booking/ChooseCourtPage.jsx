import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import showToast from "../../Utils/ShowToast.jsx";

const ChooseCourtPage = () => {
    const { userId, hallId } = useParams();
    const [hall, setHall] = useState(null);
    const [courts, setCourts] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHallDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listings/${userId}/${hallId}`);
                const json = await response.json();
                setHall(json.data.hall);
                setCourts(json.data.courts || []);
            } catch (error) {
                showToast({ message: error.message, type: "error-dark" });
            }
        };

        fetchHallDetails();
    }, [userId, hallId]);

    const handleAddToCart = (court) => {
        if (!selectedDate || !selectedSlot) {
            showToast({ message: "Please select a date and slot first", type: "error-dark" });
            return;
        }
        const bookingItem = {
            courtId: court._id,
            courtName: court.number,
            slot: selectedSlot,
            date: selectedDate,
            price: hall.pricePerHour,
        };
        setCart((prev) => [...prev, bookingItem]);
        showToast({ message: `Court ${court.name} added to cart!`, type: "success-dark" });
    };

    const proceedToCheckout = () => {
        navigate(`/user/${userId}/checkout`, { state: { cart, hall } });
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center uppercase">Choose Your Court</h2>

                {/* Selection Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
                    <div className="flex flex-col">
                        <label className="text-orange-300 mb-1 font-medium">Select Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-orange-300 mb-1 font-medium">Select Slot:</label>
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
                        >
                            <option value="">-- Choose a Slot --</option>
                            <option value="6AM - 7AM">6AM - 7AM</option>
                            <option value="7AM - 8AM">7AM - 8AM</option>
                            <option value="8AM - 9AM">8AM - 9AM</option>
                            <option value="5PM - 6PM">5PM - 6PM</option>
                            <option value="6PM - 7PM">6PM - 7PM</option>
                            <option value="7PM - 8PM">7PM - 8PM</option>
                        </select>
                    </div>
                </div>

                {/* Courts List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courts.map((court) => (
                        <div key={court._id} className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-md flex flex-col justify-between">
                            <h3 className="text-lg font-semibold text-orange-300 mb-2">{court.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{court.description || "No description available."}</p>
                            <button
                                onClick={() => handleAddToCart(court)}
                                className="mt-auto bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2 rounded-md transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Checkout CTA */}
                {cart.length > 0 && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={proceedToCheckout}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md"
                        >
                            Proceed to Checkout ({cart.length})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChooseCourtPage;
