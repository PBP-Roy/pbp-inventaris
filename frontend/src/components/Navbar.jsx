import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
                    <div className="user-name"><Link to="/profile" style={{textDecoration: 'none', color: 'black'}}>Arthur</Link></div>
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
                        <Link to="/profile"><img src="/src/assets/profile.jpg" alt="Profile" id="user-image" /></Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;