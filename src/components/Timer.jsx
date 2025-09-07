"use client";
import React from 'react';
import { useTimer } from 'react-timer-hook';

function Timer({ expiryTimestamp }) {
    const { seconds, minutes, hours, days } = useTimer({ 
        expiryTimestamp, 
        onExpire: () => console.warn('onExpire called'), 
        interval: 1000 
    });

     const formatTime = (time) => String(time).padStart(2, '0');

    // Dot separator at the bottom
    const DotSeparator = () => (
        <div className="flex flex-col justify-center items-center mx-2 space-y-1 h-full mt-3">
            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
        </div>
    );

    return (
        <div className="flex items-center space-x-2.5 lg:space-x-5 ">
            <div className="text-center">
                <div className="text-xs font-semibold mb-1">Days</div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900">{formatTime(days)}</div>
            </div>

            <DotSeparator />

            <div className="text-center">
                <div className="text-xs font-semibold mb-1">Hours</div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900">{formatTime(hours)}</div>
            </div>

            <DotSeparator />

            <div className="text-center">
                <div className="text-xs font-semibold mb-1">Minutes</div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900">{formatTime(minutes)}</div>
            </div>

            <DotSeparator />

            <div className="text-center">
                <div className="text-xs font-semibold mb-1">Seconds</div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900">{formatTime(seconds)}</div>
            </div>
        </div>
    );
}

export default Timer;
