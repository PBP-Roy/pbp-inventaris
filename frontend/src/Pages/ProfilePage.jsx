import { useState } from "react";
import './ProfilePage.css';

function ProfilePage() {
    return (
        <>
            <div className="profile-container">
                <div className="title-profile">User Profile</div>
                <div className="detail-profile">
                    <div className="profile-img"></div>
                    <div className="profile-bio"></div>
                    
                </div>
                <div className="password-option">
                    
                </div>
            </div>
        </>
    )
}

export default ProfilePage;