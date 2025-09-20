// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import showToast from "../../Utils/ShowToast.jsx";
//
//
// // Fetch the hall data (use actual API call here)
//
// const HallDetails = () => {
//
//     const { userId, hallId, vendorId } = useParams();
//     const [hall, setHall] = useState(null);
//     const [courts, setCourts] = useState([null]);
//     const [loading, setLoading] = useState(true); // Start with loading true
//
//     useEffect(() => {
//         const fetchHallDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/listings/${userId}/${hallId}`);
//                 if (!response.ok) {
//                     showToast({
//                         message: `Error fetching hall details: ${response.statusText}`,
//                         type: "error-dark"
//                     })
//                 }
//                 const json = await response.json();
//                 const hall = json.data.hall;
//                 const courts = json.data.courts;
//                 // console.log(`Data fetched from the server: ${JSON.stringify(json)}`);
//                 // console.log(`Your hall details are: ${JSON.stringify(json.data.hall)} and courts: ${JSON.stringify(json.data.courts)}`);
//                 if (!hall || !courts) {
//                     showToast({
//                         message: "No hall details found",
//                         type: "error-dark"
//                     });
//                     return;
//                 }
//                 setHall(hall);
//                 setCourts(courts);
//             } catch (error) {
//                 showToast({
//                     message: `Error fetching hall details: ${error.message}`,
//                     type: "error-dark"
//                 })
//             } finally {
//                 setLoading(false); // Set loading to false when done
//             }
//         };
//
//         fetchHallDetails();
//     }, [userId, hallId, vendorId]);
//
//     // Show loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white flex items-center justify-center">
//                 <p className="text-xl">Loading hall details...</p>
//             </div>
//         );
//     }
//
//     // Show no data state
//     if (!hall) {
//         return (
//             <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white flex items-center justify-center">
//                 <p className="text-xl">No such hall details found</p>
//             </div>
//         );
//     }
//
//     // const navigate = useNavigate();
//     // const handleBookCourt = async(e) => {
//     //     e.preventDefault();
//     //     try{
//     //         navigate(`/user/${id}/book/${hallId}`);
//     //         alert("Response received");
//     //     }
//     //     catch(e){
//     //         return alert(e.message);
//     //     }
//     // }
//
//
//     return (
//         <div className="container mx-auto p-4">
//             {/* Hall Card */}
//             <div className="bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg shadow-lg overflow-hidden mb-6">
//                 <div className="flex space-x-4 overflow-x-auto p-4">
//                     {hall.image.map((image, index) => (
//                         <img
//                             key={index}
//                             src={image}
//                             alt={`Hall image`}
//                             className="h-10 object-cover rounded-lg"
//                         />
//                     ))}
//                 </div>
//                 <h2 className="text-2xl font-semibold text-center py-4">{hall.name}</h2>
//             </div>
//
//             {/* Hall Details */}
//             <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 p-6 rounded-lg shadow-md mt-0">
//                 <h3 className="text-xl font-semibold text-white">Location:</h3>
//                 <p className="text-gray-400">
//                     {hall.address}, {hall.city}, {hall.state}
//                 </p>
//
//                 <h3 className="text-xl font-semibold text-white mt-4">Price:</h3>
//                 <p className="text-gray-400">₹{hall.pricePerHour}</p>
//
//                 <h3 className="text-xl font-semibold text-white mt-4">Available Slots: Coming soon</h3>
//                 {/*<ul className="list-disc pl-6 text-gray-400">*/}
//                 {/*    {courts.slots.map((slot, index) => (*/}
//                 {/*        <li key={index}>{slot}</li>*/}
//                 {/*    ))}*/}
//                 {/*</ul>*/}
//
//                 <h3 className="text-xl font-semibold text-white mt-4">Amenities:</h3>
//                 <p className="text-gray-400">{hall.amenities}</p>
//
//                 <h3 className="text-xl font-semibold text-white mt-4">Number of Courts:</h3>
//                 <p className="text-gray-400">{hall.numberOfCourts}</p>
//
//                 <h3 className="text-xl font-semibold text-white mt-4">Mat Type:</h3>
//                 <p className="text-gray-400">{hall.matType}</p>
//
//                 {hall.additionalInfo && (
//                     <>
//                         <h3 className="text-xl font-semibold text-white mt-4">Additional Info:</h3>
//                         <p className="text-gray-400">{hall.additionalInfo}</p>
//                     </>
//                 )}
//
//                 <div className={" container border-0 border-gray-200 bg-gray-400 rounded-xl w-1/3 "}>
//                     <h3 className="text-xl font-semibold text-black mt-4 p-4"><strong>Contact Details:</strong></h3>
//                     <ul className={"p-4"}>
//                         <li>
//                             <p className="text-black"><strong>Name of the Owner: &nbsp;</strong>{hall.vendorId.name}</p>
//                         </li>
//                         <li>
//                             <p className="text-black"><strong>Email of the Owner: &nbsp;</strong>{hall.vendorId.email}</p>
//                         </li>
//                         <li>
//                             <p className="text-black"><strong>Contact of the Owner: &nbsp;</strong>{hall.vendorId.contact}
//                             </p>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//
//         </div>
//     );
// };
//
// export default HallDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import showToast from "../../Utils/ShowToast.jsx";

const HallDetails = () => {
    const { userId, hallId, vendorId } = useParams();
    const [hall, setHall] = useState(null);
    const [courts, setCourts] = useState([null]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHallDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listings/${userId}/${hallId}`);
                if (!response.ok) {
                    showToast({
                        message: `Error fetching hall details: ${response.statusText}`,
                        type: "error-dark"
                    });
                }
                const json = await response.json();
                const hall = json.data.hall;
                const courts = json.data.courts;
                if (!hall || !courts) {
                    showToast({
                        message: "No hall details found",
                        type: "error-dark"
                    });
                    return;
                }
                setHall(hall);
                setCourts(courts);
            } catch (error) {
                showToast({
                    message: `Error fetching hall details: ${error.message}`,
                    type: "error-dark"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchHallDetails();
    }, [userId, hallId, vendorId]);

    const handleChooseCourts = () => {
        navigate(`/user/${userId}/book/${hallId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] text-white flex items-center justify-center">
                <p className="text-xl font-bold animate-pulse">Loading hall details...</p>
            </div>
        );
    }

    if (!hall) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] text-white flex items-center justify-center">
                <p className="text-xl font-bold">No such hall details found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-[#1a1a1a] border border-orange-500 rounded-xl shadow-xl p-6 mb-8">
                    <div className="flex space-x-4 overflow-x-auto rounded-md mb-4">
                        {hall.image.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Hall ${index}`}
                                className="h-32 w-48 object-cover rounded-lg border border-gray-600"
                            />
                        ))}
                    </div>
                    <h2 className="text-3xl font-extrabold text-orange-400 text-center tracking-wide uppercase">{hall.name}</h2>
                </div>

                {/* Main content */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left section: Hall info */}
                    <div className="bg-[#141414] border border-gray-800 rounded-lg p-6 shadow-md flex-1 space-y-6">

                        <div>
                            <h3 className="text-lg font-semibold text-orange-400">📍 Location:</h3>
                            <p className="text-gray-300">{hall.address}, {hall.city}, {hall.state}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-orange-400">💰 Price per Hour:</h3>
                            <p className="text-gray-300">₹{hall.pricePerHour}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-orange-400">🎯 Amenities:</h3>
                            <p className="text-gray-300">{hall.amenities}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-orange-400">🏸 Number of Courts:</h3>
                            <p className="text-gray-300">{hall.numberOfCourts}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-orange-400">🧵 Mat Type:</h3>
                            <p className="text-gray-300">{hall.matType}</p>
                        </div>

                        {hall.additionalInfo && (
                            <div>
                                <h3 className="text-lg font-semibold text-orange-400">📌 Additional Info:</h3>
                                <p className="text-gray-300">{hall.additionalInfo}</p>
                            </div>
                        )}

                        <div className="mt-6">
                            <button
                                onClick={handleChooseCourts}
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
                            >
                                Choose Court, Slot & Date
                            </button>
                        </div>
                    </div>

                    {/* Right section: Contact details */}
                    <div className="bg-gradient-to-br from-orange-800 via-orange-700 to-orange-600 text-black rounded-lg p-6 w-full md:w-1/3 shadow-lg">
                        <h3 className="text-xl font-bold mb-4">📞 Contact Details</h3>
                        <ul className="space-y-2">
                            <li><strong>Name:</strong> {hall.vendorId.name || "PlayWise"}</li>
                            <li><strong>Email:</strong> {hall.vendorId.email}</li>
                            <li><strong>Phone:</strong> {hall.vendorId.contact}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HallDetails;
