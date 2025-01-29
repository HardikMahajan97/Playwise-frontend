import {React, useEffect, useState} from 'react';
import {useNavigate, Link, useParams} from "react-router-dom";

export default function UserHomePage(){
    const [listings, setListings] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    const handleViewDetails = (hallId) => {
        // alert("Before navigating to the court details :"+hallId);
        // alert("User id is : "+id);
        navigate(`/user/court-details/${id}/${hallId}`);
    }
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listings/${id}`);

                console.log(response);
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

    return(
        <>
            <div className="min-h-screen bg-gradient-to-r from-black via-violet-900 to-blue-800 text-white">
                <header className="bg-gradient-to-br from-violet-900/70 to-blue-800/70 p-6 shadow-2xl">
                    <h1 className="text-center text-3xl font-extrabold text-white/90 tracking-wide">
                        Welcome to PlayWise
                    </h1>
                </header>

                <main className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <div
                                key={listing._id}
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
                                    onClick={() => handleViewDetails(listing._id)}
                                    className="mt-6 w-full py-3 bg-violet-700 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </main>


            </div>
            <footer className="bg-black/50 text-gray-300 text-center p-4 mb-0">
                <p>&copy; 2025 PlayWise. All Rights Reserved.</p>
            </footer>

        </>
    );
}