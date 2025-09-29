import { useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import showToast from '../../Utils/ShowToast.jsx';  

export default function CreateHall() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        name: "",
        image: [""],
        slots: [""],
        price: "",
        amenities: "",
        numberOfCourts: "",
        matType: "",
        additionalInfo: "",
    });
    const {vendorId, hallId} = useParams();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Add submission logic here
        if (!vendorId || hallId) {
            alert("Vendor ID is missing!");
            return;
        }
        try{
            const response = await fetch(`http://localhost:5000/home-vendor/${vendorId}/create-hall`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({...formData, vendorId: vendorId}),
            });
            console.log(`The data after backend's response: ${response}`);
            const data = await response.json();
            console.log(data);
            if(response.ok){
                alert('You have successfully sent the request to add your Badminton Hall, please wait until we verify your details!' +
                    ' Your hall will be up and running soon. Thank you for your cooperation');
                navigate(`/vendor/home-page/${vendorId}`);
            }
        }catch(e){
            showToast(`Error occurred while creating hall: ${e.message}`, "error");
            alert(e.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Add Court Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* City, State, Country */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Court Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value.split(",") })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Slots */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Available Slots (comma-separated)</label>
                    <input
                        type="text"
                        name="slots"
                        value={formData.slots}
                        onChange={(e) =>
                            setFormData({ ...formData, slots: e.target.value.split(",") })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Amenities */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amenities</label>
                    <input
                        type="text"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Number of Courts */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Courts</label>
                    <input
                        type="number"
                        name="numberOfCourts"
                        value={formData.numberOfCourts}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Mat Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mat Type</label>
                    <select
                        name="matType"
                        value={formData.matType}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Mat Type</option>
                        <option value="Hard">Hard</option>
                        <option value="Synthetic">Synthetic</option>
                        <option value="Clay">Clay</option>
                    </select>
                </div>

                {/* Additional Info */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        rows={4}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Submit Court Details
                    </button>
                </div>
            </form>
        </div>
    );
};
