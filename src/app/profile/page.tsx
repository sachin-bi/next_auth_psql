"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {

    const router = useRouter()


    const [data, setData] = useState<any>(null)  // look here

    const [isLoading, setIsLoading] = useState(false);

    const getUserDetails = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('api/users/me');
            setData(res.data.userDetails)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getUserDetails();

    }, []);

    // console.log(data);
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("logout success!")
            router.push("/login")
        } catch (error: any) {
            console.log("err in logoutFn section src/app/profile ", error.message)
            toast.error(error.message)
        }
    }
    


    return (
        <div className="border-2 p-2 m-1 min-h-dvh flex flex-col justify-center items-center">
            <h1 className=" p-2 text-blue-400 text-4xl font-bold">
                Profile pg
            </h1>
            {isLoading === true ? (<h2 className="font-mono">Loading..</h2>) : (
                <div>

                    <div className="border-2 p-2 m-2 font-mono">

                        {/* <div>
                        Id: {data && data.id ? data.id : "N/A"}
                        </div> */}
                        <div>
                            Username: {data && data.username ? data.username : "N/A"}
                        </div>
                        <div>
                            Email: {data && data.email ? data.email : "N/A"}
                        </div>
                    </div>

                    <p className="mt-3 text-xs">
                        created at: {data && data.createdAt ? data.createdAt : "N/A"}
                    </p>


                </div>


            )}
            <footer className="mt-36">
                <button
                    className='bg-blue-800 p-2 mt-4 hover:bg-blue-900 text-white font-bold'
                onClick={logout}
                >logout</button>
            </footer>
        </div>
    )
}


