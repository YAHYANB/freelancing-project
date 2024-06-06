import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUpdateUser } from "../../redux/User"
import { updateUserData } from "../../redux/User"

export default function Security() {
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const errors = useSelector(e => e.user.error)
    const token = JSON.parse(localStorage.getItem('token'))
    const [error, setError] = useState(null)

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
    useEffect(() => {
        if (userData.password !== userData.pwdConfirmation) {
            setError('Please make sure you entered the same password')
        } else {
            setError(null)
        }
    }, [userData.pwdConfirmation, userData.password])

    return (
        <div class="col-span-8 overflow-hidden sm:bg-gray-50 sm:pb-8 sm:px-8 sm:shadow">
            <div class="pt-4">
                <h1 class="py-2 text-xl font-medium">Security settings :</h1>
                <p class="font- text-slate-600">You may need to change your password </p>
            </div>
            <hr class="mt-4 mb-8" />
            <form class="w-full" onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full flex-wrap max-w-lg px-3 mb-6 ">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Old password
                        </label>
                        <input class={`appearance-none block w-full text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors?.message && "border-red-500"}`}
                            id="grid-first-name" type="password" name="oldPwd" onChange={handleChange} placeholder="*********" />
                        {errors && errors.message && <p className="text-red-500 text-xs px-1 italic">{errors.message}</p>}
                    </div>
                    <div class="w-full max-w-lg flex-wrap px-3 mb-5">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            New password
                        </label>
                        <input class={`appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors?.errors?.password && "border-red-500"}`} id="grid-last-name" type="password" name="password" onChange={handleChange} placeholder="*********" />
                        {errors && <p className="text-red-500 text-xs px-1 italic">{errors.errors?.password}</p>}
                    </div>
                </div>
                <div class="flex max-w-lg flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Confirme password
                        </label>
                        <input class="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" name="pwdConfirmation" onChange={handleChange} placeholder="*********" />
                        {error ?
                            <p class="text-red-500 text-xs px-1 italic">{error}</p>
                            :
                            <p class="text-gray-600 text-xs px-1 italic">Make it as long and as crazy as you'd like</p>
                        }
                    </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700" disabled={error !== null}>Save</button>
            </form>
        </div>

    );
}

