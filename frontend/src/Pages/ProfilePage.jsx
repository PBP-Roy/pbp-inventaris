import { useState } from "react";
import './ProfilePage.css';

function ProfilePage() {
    return (
        <>
            <div className="profile-container">
                <div className="title-profile"><h1>User Profile</h1></div>
                <div className="detail-profile">
                    <div className="profile-img">
                        <img src="/src/assets/daffa.jpg" alt="" />
                        <div className="update-img-pr">
                        <button type="submit" className="update-img">Update New Image</button>
                        </div>
                    </div>
                    <div className="profile-bio">
                        <div className="bio-container">
                            <div className="name-container">
                                <div className="title-name">Name</div>
                                <div className="box-name">
                                    {/* Daffa muzhaffar fakhrudin */}
                                    <div className="icon-name"><img src="/src/assets/human.jpg" alt="" /></div>
                                    <div className="vertical-divider"></div>
                                    <div className="content-name"></div>
                                </div>
                            </div>
                            <div className="email-container">
                                <div className="title-email">Email</div>
                                <div className="box-email">
                                    {/* daffaxfurina@gmail.com */}
                                    <div className="icon-email"><img src="/src/assets/human.jpg" alt="" /></div>
                                    <div className="vertical-divider"></div>
                                    <div className="content-email">
                                        
                                    </div>
                                </div>
                            </div>
                            {/* <div className="bio-label">Name</div>
                            <div className="vertical-divider"></div>
                            <div className="bio-value">Daffa</div> */}
                        </div>
                    </div>
                    
                </div>
                <div className="title-password"><h1>Password</h1></div>
                <div className="password-option">
                    
                </div>
            </div>
        </>
    )
}

export default ProfilePage;