'use client'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // navigating by force to other login pg 
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            toast.success('Processing...')
            const response = await axios.post("api/users/signup", formData)
            if (response.status === 200) {
                toast.success('Signup successful! Redirecting to login page...');
                router.push('/login')
            }

            console.log("---- src/app/signup (axios res of post-/api/users/signup) Signup success , response=", response)

            // setFormData({
            //     username: '',
            //     email: '',
            //     password: '',
            // })
        } catch (err: any) {
            // If the error status is 400, inform the user that the account already exists
            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.message || "User already exists!");
            } else {
                // Handle other errors
                toast.error(err.message || "An error occurred during signup.");
            }
            console.error("Sign-up failed!", err);
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-gray-400 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl text-black font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-black text-lg">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

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
                    {/* <div > */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                    {/* </div> */}
                </form>

                {/* Link to Login Page */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


