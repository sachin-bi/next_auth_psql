'use client'
import { useState } from "react";
import Link from "next/link";


export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log(formData); // Handle form submission logic
    // };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("This is formdata from FE:", formData)
        setFormData({
            username: '',
            email: '',
            password: '',
        })
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


