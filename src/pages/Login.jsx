import {React, useState,useEffect} from "react";


export default function Login(){

    const [form, setFormData] = useState({
        username : '',
        password : '',
    });
    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prev) => ({
            ...prev,
                [id] : value,
        }));
    }
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const response = await fetch("http://localhost:5000/vendor/login", {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(form),
            });

            await response.json();
            if(response.ok){
                alert("Login successfull");
                // response.redirect("http://localhost:5000/listings");
            }else{
                alert("Login failed");
            }

        }catch(err){
            alert(`Some Error occurred ${err.message}`);
        }
    };

    return(
        <>
            <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-orange-600">
                <header className="w-screen text-center py-4 text-white font-bold text-2xl">
                    <h1>Login for PlayWise</h1>
                </header>

                <main className="bg-white p-8 rounded-lg shadow-2xl w-screen max-w-xl">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text ">Good to see you back!</h2>

                    <form onSubmit={handleSubmit}>
                        {/*Username*/}
                        <div>
                            <label htmlFor={"username"}
                                   className={"block text-sm font-medium text-gray-700 mb-1"}>Username</label>
                            <input
                                id={"username"}
                                type={"text"}
                                required
                                value={form.username}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-400  rounded-md shadow-md hover:border-gray-600 text-sm p-2"
                                placeholder="Enter Username"
                            />
                        </div>
                        {/*Password*/}
                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium mt-5 text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-400 rounded-md shadow-md hover:border-gray-600 text-sm p-2"
                                placeholder="Enter Password"
                            />
                        </div>
                        <br/>
                        <button type={"submit"} className={"border-1  w-1/2 h-10 border-amber-700 rounded-lg bg-gradient-to-r from-teal-400 to-lime-500 hover: from-emerald-500 to-lime-600 transition"}> Login </button>
                    </form>
                </main>
            </div>
        </>
    )
}