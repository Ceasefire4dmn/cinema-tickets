// import React, { useState, useEffect } from 'react';
// import { DatabaseContext } from './DatabaseContext';

// export const DatabaseProvider = ({ children }) => {
//     const [data, setData] = useState({ movies: [], halls: [], showtimes: [] });
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('/db.json')
//             .then(res => res.json())
//             .then(json => {
//                 setData(json);
//                 const saved = localStorage.getItem('cinema_bookings');
//                 if (saved) setBookings(JSON.parse(saved));
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("Database load error:", err);
//                 setLoading(false);
//             });
//     }, []);

//     const addBooking = (showtimeId, seatRow, seatNum) => {
//         const newBooking = { id: Date.now(), showtime_id: showtimeId, row: seatRow, number: seatNum };
//         setBookings(prev => {
//             const updated = [...prev, newBooking];
//             localStorage.setItem('cinema_bookings', JSON.stringify(updated));
//             return updated;
//         });
//     };

//     const resetDatabase = () => {
//         setBookings([]);
//         localStorage.removeItem('cinema_bookings');
//     };

//     const value = { ...data, bookings, addBooking, resetDatabase, loading };

//     return (
//         <DatabaseContext.Provider value={value}>
//             {children}
//         </DatabaseContext.Provider>
//     );
// };
import React, { useState, useEffect } from 'react';
import { DatabaseContext } from './DatabaseContext';

export const DatabaseProvider = ({ children }) => {
    // Добавляем seats в начальное состояние
    const [data, setData] = useState({
        movies: [],
        halls: [],
        seats: [], // Добавлено
        showtimes: []
    });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(json => {
                // Убеждаемся, что сохраняем все поля из json
                setData({
                    movies: json.movies || [],
                    halls: json.halls || [],
                    seats: json.seats || [], // Добавлено
                    showtimes: json.showtimes || []
                });

                const saved = localStorage.getItem('cinema_bookings');
                if (saved) setBookings(JSON.parse(saved));
                setLoading(false);
            })
            .catch(err => {
                console.error("Database load error:", err);
                setLoading(false);
            });
    }, []);

    // Обновляем addBooking: теперь работаем с seatId, а не с рядами
    const addBooking = (showtimeId, seatId) => {
        const newBooking = {
            id: Date.now(),
            showtime_id: parseInt(showtimeId), // Приводим к числу для надежности
            seat_id: parseInt(seatId),         // Используем seat_id из твоей схемы
            status: 'sold'
        };

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

    // Все данные из data (включая новые seats) попадут в value
    const value = { ...data, bookings, addBooking, resetDatabase, loading };

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    );
};