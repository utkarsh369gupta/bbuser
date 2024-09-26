import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="bg-[#14303b] pt-8 pb-8 lg:pt-10 lg:pb-10 mb-0">
                <h1 className="text-lg font-semibold text-center text-white lg:text-4xl lg:leading-tight">
                    Contact Us
                </h1>
                <div className="flex flex-col items-center gap-4 mt-8 lg:mt-10 lg:flex-row lg:justify-around">
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <img className="h-auto max-w-20 transition-all duration-300 rounded-lg  filter inline hover:max-w-24" src="images/budgetbuddies.png" alt="image description" />
                        <p className="text-3xl font-bold text-white">Budget Buddy</p>
                    </div>
                    <div className="flex flex-col items-center font-bold text-slate-200 text-lg lg:text-xl mt-4 lg:mt-0">
                        <div className="flex items-center mb-2">
                            writeus@budgetbuddy.org
                        </div>
                        <div className="flex items-center">
                            +91 9999999999
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center mt-9'>
                    <h2 className="text-xl font-bold text-white pb-5">Team Members Name:</h2>
                    <p className="text-xl font-serif text-white">Utkarsh Gupta: 22BIT0267</p>
                    <p className="text-xl font-serif text-white">Shreyas Shetty: 22BIT0348</p>
                    <p className="text-xl font-serif text-white">Rakesh Prajapati: 22BIT0349</p>
                    <p className="text-xl font-serif text-white">Arghya Ghosh: 22BIT0631</p>
                </div>
                <div className='flex flex-col mt-9 text-slate-200'>Copyright © 2024 BudgetBuddy</div>
            </div>
        </>
    )
}

export default Footer