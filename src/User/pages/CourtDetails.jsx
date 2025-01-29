import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


// Fetch the hall data (use actual API call here)

const CourtDetails = () => {
    const { id, hallId } = useParams();
    const [hall, setHall] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHallDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listings/${id}/${hallId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hall details');
                }
                const data = await response.json();
                setHall(data);
            } catch (error) {
                console.error("Error fetching hall details:", error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchHallDetails();
    }, [id, hallId]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white flex items-center justify-center">
                <p className="text-xl">Loading court details...</p>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white flex items-center justify-center">
                <p className="text-xl text-red-400">Error: {error}</p>
            </div>
        );
    }

    // Show no data state
    if (!hall) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white flex items-center justify-center">
                <p className="text-xl">No court details found</p>
            </div>
        );
    }

    const handleBookCourt = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/listings/${id}/book/${hallId}`);
            alert("Response received");
        }
        catch(e){
            return alert(e.message);
        }
    }


    return (
        <div className="container mx-auto p-4">
            {/* Hall Card */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="flex space-x-4 overflow-x-auto p-4">
                    {hall.image.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Hall image`}
                            className="h-10 object-cover rounded-lg"
                        />
                    ))}
                </div>
                <h2 className="text-2xl font-semibold text-center py-4">{hall.Name}</h2>
            </div>

            {/* Hall Details */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 p-6 rounded-lg shadow-md mt-0">
                <h3 className="text-xl font-semibold text-white">Location:</h3>
                <p className="text-gray-400">
                    {hall.address}, {hall.city}, {hall.state}, {hall.country}
                </p>

                <h3 className="text-xl font-semibold text-white mt-4">Price:</h3>
                <p className="text-gray-400">${hall.price}</p>

                <h3 className="text-xl font-semibold text-white mt-4">Available Slots:</h3>
                <ul className="list-disc pl-6 text-gray-400">
                    {hall.slots.map((slot, index) => (
                        <li key={index}>{slot}</li>
                    ))}
                </ul>

                <h3 className="text-xl font-semibold text-white mt-4">Amenities:</h3>
                <p className="text-gray-400">{hall.amenities}</p>

                <h3 className="text-xl font-semibold text-white mt-4">Number of Courts:</h3>
                <p className="text-gray-400">{hall.numberOfCourts}</p>

                <h3 className="text-xl font-semibold text-white mt-4">Mat Type:</h3>
                <p className="text-gray-400">{hall.matType}</p>

                {hall.additionalInfo && (
                    <>
                        <h3 className="text-xl font-semibold text-white mt-4">Additional Info:</h3>
                        <p className="text-gray-400">{hall.additionalInfo}</p>
                    </>
                )}

                <div className={" container border-0 border-gray-200 bg-gray-400 rounded-xl w-1/3 "}>
                    <h3 className="text-xl font-semibold text-black mt-4 p-4"><strong>Contact Details:</strong></h3>
                    <ul className={"p-4"}>
                        <li>
                            <p className="text-black"><strong>Name of the Owner: &nbsp;</strong>{hall.vendorId.Name}</p>
                        </li>
                        <li>
                            <p className="text-black"><strong>Email of the Owner: &nbsp;</strong>{hall.vendorId.email}</p>
                        </li>
                        <li>
                            <p className="text-black"><strong>Contact of the Owner: &nbsp;</strong>{hall.vendorId.contact}
                            </p>
                        </li>
                    </ul>
                </div>

                <div>
                    <br/>

                {/*    Book court*/}
                    <button onClick={handleBookCourt} className="border-white border-1 bg-white rounded-sm text-black">
                        Book Court
                    </button>
                </div>


            </div>
        </div>
    );
};

export default CourtDetails;
