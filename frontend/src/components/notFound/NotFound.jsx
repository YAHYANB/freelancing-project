import React from 'react'

function NotFound() {
    return (

        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div class="flex flex-auto items-center justify-center text-center px-4 flex-col sm:flex-row">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight sm:pr-6 sm:mr-6 sm:border-r sm:border-slate-900/10">404</h1>
                <h2 class="mt-2 text-lg text-slate-700 sm:mt-0">This page could not be found.</h2>
            </div>
        </div>
    )
}

export default NotFound
