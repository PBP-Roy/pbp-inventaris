import { useState, useEffect } from "react";
import './Navbar.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function Navbar() {

    const [date, setDate] = useState("");

    // Set tanggal saat ini sebagai default
    useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format yyyy-mm-dd
    setDate(formattedDate);
    }, []);

    // Fungsi untuk menangani perubahan tanggal oleh user
    const handleDateChange = (event) => {
    setDate(event.target.value);
    };

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="user-name"><a href="/profile">Arthur</a></div>
                    <div className="date-options">
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            className="date-input"
                        />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="notification"><NotificationsNoneIcon /></div>
                    <div className="profil-user">
                        <img src="/src/assets/profile.jpg" alt="Profile" id="user-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;