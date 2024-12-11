import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStateContext } from "../contexts/ContextProvider";
import { logout } from "../api/userApi";

function Navbar() {
    const { user } = useStateContext();
    const [date, setDate] = useState("");
    const NavigateTo = useNavigate();
    const apiURL = 'http://localhost:8000';

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

    const handleLogout = () => {
        logout().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            NavigateTo('/guest/login');
        });
    }

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="user-name"><Link to="/profile" style={{textDecoration: 'none', color: 'black'}}>{user ? user.name : "Loading..."}</Link></div>
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
                    <div className="logout" onClick={handleLogout}><LogoutIcon /></div>
                    <div className="profil-user">
                        <Link to="/profile"><img src={user.image ? `${apiURL}/storage/${user.image}` : '/src/assets/daffa.jpg'} alt="Profile" id="user-image" /></Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;