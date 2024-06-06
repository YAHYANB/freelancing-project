import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../redux/User";
import Countries from '../../Cities.json'


export default function Accounts() {

    const errors = useSelector(e => e.user.error)
    const user = useSelector(u => u.user.user)
    const [userData, setUserData] = useState(user && {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        country: user.country
    })
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token'))

    const handleChange = (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserData({ token, updatedData: userData }));
    }
    return (
        <div class="col-span-8 overflow-hidden sm:bg-gray-50 sm:pb-8 sm:px-8 sm:shadow">
            <div class="pt-4">
                <h1 class="py-2 text-xl font-medium">Account settings :</h1>
                <p class="font- text-slate-600">You may need to change your personal informations </p>
            </div>
            <hr class="mt-4 mb-8" />
            <form class="w-full" onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input class={`appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors?.errors?.fname && "border-red-500"}`} name="fname" value={userData.fname} id="grid-first-name" type="text" onChange={handleChange} />
                        {errors && <p className="text-red-500 text-xs px-1 italic">{errors.errors?.fname}</p>}
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Last Name
                        </label>
                        <input class={`appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors?.errors?.lname && "border-red-500"}`} name="lname" value={userData.lname} id="grid-last-name" type="text" onChange={handleChange} />
                        {errors && <p className="text-red-500 text-xs px-1 italic">{errors.errors?.lname}</p>}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                            Email
                        </label>
                        <input class={`appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors?.errors?.email && "border-red-500"}`} name="email" value={userData.email} id="grid-email" type="email" onChange={handleChange} />
                        {errors && <p className="text-red-500 text-xs px-1 italic">{errors.errors?.email}</p>}
                        <p class="text-gray-600 text-xs italic">Make sure you enter a valide email</p>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-country">
                            Country
                        </label>
                        <select class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="country" value={userData.country} id="grid-country" onChange={handleChange}>
                            <option selected>Select Country</option>
                            {Countries.map((city, index) => (
                                <option value={city} key={index}>{city}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700">Save</button>
            </form>
        </div>
    );
}

