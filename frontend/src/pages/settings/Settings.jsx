import {Link, Outlet } from "react-router-dom";

export default function Settings() {
    return (
        <div class="min-h-screen max-w-screen-xl mx-10 sm:mx-8">
            <h1 class="border-b py-6 text-lg font-semibold">Settings</h1>
            <div class="grid grid-cols-8 sm:grid-cols-10">
                <div class="relative my-4 w-56 sm:hidden">
                    <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
                    <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-green-800 peer-checked:ring">Accounts </label>
                    <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <div class="max-h-0 select-none flex flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <Link class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-green-800 hover:text-white">Security</Link>
                        <Link class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-green-800 hover:text-white">Notifications</Link>
                    </div>
                </div>

                <div class="col-span-2 hidden sm:block">
                    <div className="flex flex-col ">
                        <Link to='' class="mt-5 cursor-pointer border-l-2 focus:border-l-green-800 border-transparent px-2 py-2 focus:text-green-800 font-semibold transition hover:border-l-green-800 hover:text-green-800">Accounts</Link>
                        <Link to='Security' class="mt-5 cursor-pointer border-l-2 focus:border-l-green-700 border-transparent px-2 py-2 focus:text-green-800 font-semibold transition hover:border-l-green-800 hover:text-green-800">Security</Link>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>

    );
}
