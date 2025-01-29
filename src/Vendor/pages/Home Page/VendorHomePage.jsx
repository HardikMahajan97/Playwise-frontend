// import {React, useEffect, useState} from 'react';
// import {useParams} from "react-router-dom";
// export default function VendorHomePage(){
//     const [listings, setListings] = useState([]);
//     const {id} = useParams();
//
//     useEffect(
//         () => {
//             const fetchListings = async () => {
//                 try{
//                     const response = await fetch(`http://localhost:5000/vendor-home/${id}`);
//                     const data = await response.json();
//                     // console.log("Fetched listings:", data);
//                     console.log("Full Response:", response);
//                     console.log("Parsed Data:", data);
//                     console.log("Data type:", typeof data);
//                     console.log("Data keys:", Object.keys(data))
//                     if(response.ok){
//                         setListings(data);
//                     }else{
//                         alert("Error, it says: " + await response.text());
//                     }
//                 }catch(e){
//                     return alert(`Alert it says: ${e}`);
//                 }
//             };
//             fetchListings();
//         }, [id]
//     )
//
//     return (
//     //     Dashboard
//         <>
//             {
//                 /*Analytics:
//                 total shuttlers,
//                 current courts(halls),
//                 total bookings done,
//                 current bookings(realtime),
//                 total earnings (TO be done in backend)
//                 Available slots and courts
//                 */
//             }
//
//             <div className="min-h-screen bg-gray-100">
//                 {/* Header */}
//                 <header className="bg-blue-600 text-white p-4 shadow-md">
//                     <h1 className="text-center text-2xl font-bold">
//                         Vendor Dashboard - Your Listings
//                     </h1>
//                 </header>
//
//                 {/* Main Content */}
//                 <main className="p-6">
//                     {listings.length === 0 ? (
//                         <div className="text-center mt-10">
//                             <h2 className="text-xl font-semibold text-gray-700">
//                                 No Listings Found
//                             </h2>
//                             <p className="text-gray-500">
//                                 You haven&#39;t added any courts yet. Start listing now!
//                             </p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {listings.map((listing) => (
//                                 <div
//                                     key={listing._id}
//                                     className="bg-white p-4 rounded-lg shadow-lg"
//                                 >
//                                     <h3 className="text-lg font-semibold text-blue-700">
//                                         {listing.Name}
//                                     </h3>
//                                     <p className="text-gray-600 mt-2">
//                                         <strong>Location:</strong> {listing.location}
//                                     </p>
//                                     <p className="text-gray-600">
//                                         <strong>Price:</strong> ${listing.price}/hour
//                                     </p>
//                                     <p className="text-gray-500 text-sm mt-2">
//                                         {listing.additionalInfo || "No additional information"}
//                                     </p>
//                                     <button
//                                         className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700">
//                                         Manage Court
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </main>
//
//                 {/* Footer */}
//                 <footer className="bg-gray-800 text-white text-center p-4 mt-10">
//                     <p>&copy; 2025 PlayWise. All Rights Reserved.</p>
//                 </footer>
//             </div>
//         </>
//     );
// }


// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
//
// export default function VendorHomePage() {
//     const [listings, setListings] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { id } = useParams();
//
//     useEffect(() => {
//         const fetchListings = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await fetch(`http://localhost:5000/vendor-home/${id}`);
//                 const data = await response.json();
//
//                 console.group('Fetch Debugging');
//                 console.log("Response Status:", response.status);
//                 console.log("Response OK:", response.ok);
//                 console.log("Parsed Data:", JSON.stringify(data, null, 2));
//                 console.log("Data Type:", typeof data);
//                 console.log("Data Keys:", Object.keys(data));
//                 console.groupEnd();
//
//                 if (response.ok) {
//                     // Try multiple potential data paths
//                     const listingsData = data;
//
//                     console.log("Processed Listings:", listingsData);
//                     console.log("Listings Length:", listingsData.length);
//
//                     setListings(Array.isArray(listingsData) ? listingsData : []);
//                     setError(null);
//                 } else {
//                     setError(data.message || "Failed to fetch listings");
//                     setListings([]);
//                 }
//             } catch (e) {
//                 console.error("Fetch Error:", e);
//                 setError(e.message);
//                 setListings([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//         fetchListings();
//     }, [id]);
//
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//
//     return (
//         <div className="min-h-screen bg-gray-100">
//             <header className="bg-blue-600 text-white p-4 shadow-md">
//                 <h1 className="text-center text-2xl font-bold">
//                     Vendor Dashboard - Your Listings
//                 </h1>
//             </header>
//
//             <main className="p-6">
//                 {listings.length === 0 ? (
//                     <div className="text-center mt-10">
//                         <h2 className="text-xl font-semibold text-gray-700">
//                             No Listings Found
//                         </h2>
//                         <p className="text-gray-500">
//                             You haven&#39;t added any courts yet. Start listing now!
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {listings.map((listing) => (
//                             <div
//                                 key={listing._id}
//                                 className="bg-white p-4 rounded-lg shadow-lg"
//                             >
//                                 <h3 className="text-lg font-semibold text-blue-700">
//                                     {listing.Name}
//                                 </h3>
//                                 <p className="text-gray-600 mt-2">
//                                     <strong>Location:</strong> {listing.address}, {listing.city}, {listing.state}
//                                 </p>
//                                 <p className="text-gray-600">
//                                     <strong>Price:</strong> ${listing.price}/hour
//                                 </p>
//                                 <p className="text-gray-500 text-sm mt-2">
//                                     {listing.additionalInfo || "No additional information"}
//                                 </p>
//                                 <button
//                                     className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700">
//                                     Manage Court
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }

import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function VendorHomePage() {
    const [listings, setListings] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/home-vendor/${id}`);
                const data = await response.json();

                //Check if the response is array or not, if not then destructure the values in the object to be passed on as arrays.
                const listingsArray = Array.isArray(data)
                    ? data
                    : Object.values(data).filter(item => item && typeof item === 'object');

                setListings(listingsArray);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
                alert(`Error fetching listings: ${error.message}`);
            }
        };

        fetchListings();
    }, [id]);

    const navigate = useNavigate();
    const handleAddNewCourt = (e) => {
        navigate(`/create-court/${id}`);
    }
    return (
        <>
        <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white">
            <header className="bg-gradient-to-br from-violet-900/70 to-blue-800/70 p-6 shadow-2xl">
                <h1 className="text-center text-3xl font-extrabold text-white/90 tracking-wide">
                    Vendor Dashboard
                </h1>
            </header>

            <main className="p-8">
                {listings.length === 0 ? (
                    <div className="text-center mt-16 bg-black/30 p-10 rounded-2xl">
                        <h2 className="text-2xl font-bold text-violet-200 mb-4">
                            No Listings Found
                        </h2>
                        <p className="text-gray-300">
                            You haven&#39;t added any courts yet. Start listing now!
                        </p>

                        <button
                            onClick={handleAddNewCourt}
                            className="mt-6 px-6 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-600 transition duration-300">
                            Add New Court
                        </button>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <div
                                key={id}
                                className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-violet-800/50 hover:border-blue-600/50 transition duration-300"
                            >
                                <h3 className="text-xl font-bold text-violet-200 mb-3">
                                    {listing.Name}
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-300">
                                        <strong className="text-blue-300">Location:</strong> {listing.city}
                                    </p>
                                    <p className="text-gray-300">
                                        <strong className="text-blue-300">Price:</strong>
                                        <span className="text-green-300 ml-2">${listing.price}/hour</span>
                                    </p>
                                </div>

                                <button
                                    className="mt-6 w-full py-3 bg-violet-700 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                    Manage Court
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>


        </div>
        <footer className="bg-black/50 text-gray-300 text-center p-4 mb-0">
            <p>&copy; 2025 PlayWise. All Rights Reserved.</p>
        </footer>
        </>
);
}