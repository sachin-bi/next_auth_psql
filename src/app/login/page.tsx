'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // navigating by force to other login pg 
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState({

        email: '',
        password: '',
    });

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log(formData); // Handle form submission logic
    // };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log("This is formdata from FE:", formData)
        try {

            const response = await axios.post('api/users/login', formData)  //.get had type issue
            // console.log("This is formdata from FE:", response.data)
            if (!response.data.message) {
                toast.error(response.data.message)
            }
            if (response.status === 200) {
                toast.success('Login successful! Redirected to profile page...');
                router.push('/profile')
            }
            // setFormData({

            //     email: '',
            //     password: '',
            // })
        } catch (err: any) {
            // If the error status is 400, inform the user that the account already exists
            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.message || "wrong pass or user don't exists");
            } else {
                // Handle other errors
                toast.error(err.message || "An error occurred during signup.");
            }
            console.error("login failed!", err);
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-gray-400 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl text-black font-bold mb-6 text-center">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-black text-lg">


                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            //   onChange={handleChange}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            //   onChange={handleChange}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <div >
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                {/* Link to Login Page */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        New here?{' '}
                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
                            Sign-up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


