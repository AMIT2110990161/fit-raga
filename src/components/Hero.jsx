import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
            <div className='flex flex-col gap-4'>

                <p>IT'S TIME TO GET</p>
                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>RAGA<span className='text-blue-400'> &fitness</span></h1>
            </div>
            <p className='text-sm md:text-base font-light'>Stop making excuses and start making gains with <span className='text-blue-400 font-medium'>RAGA &fitness. <br /> </span> Push harder, lift heavier, and become unstoppable. Your best body is waiting – claim it now!</p>
            <div className='flex gap-5'>
                <Link to={'/Generator'}>
                    <Button text={"Plan your Workouts"}></Button>
                </Link>

                <Link to={'/HomePage'}><Button text = {"Record your Workout"}></Button></Link>
            </div>
        </div>
    )
}
