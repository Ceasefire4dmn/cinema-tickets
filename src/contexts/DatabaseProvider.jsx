import React, { useState, useEffect } from 'react';
import { DatabaseContext } from './DatabaseContext';

export const DatabaseProvider = ({ children }) => {
    const [data, setData] = useState({ movies: [], halls: [], showtimes: [] });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(json => {
                setData(json);
                const saved = localStorage.getItem('cinema_bookings');
                if (saved) setBookings(JSON.parse(saved));
                setLoading(false);
            })
            .catch(err => {
                console.error("Database load error:", err);
                setLoading(false);
            });
    }, []);

    const addBooking = (showtimeId, seatRow, seatNum) => {
        const newBooking = { id: Date.now(), showtime_id: showtimeId, row: seatRow, number: seatNum };
        setBookings(prev => {
            const updated = [...prev, newBooking];
            localStorage.setItem('cinema_bookings', JSON.stringify(updated));
            return updated;
        });
    };

    const resetDatabase = () => {
        setBookings([]);
        localStorage.removeItem('cinema_bookings');
    };

    const value = { ...data, bookings, addBooking, resetDatabase, loading };

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    );
};