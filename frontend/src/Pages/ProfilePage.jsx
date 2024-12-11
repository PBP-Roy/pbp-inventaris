import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { updateUser } from "../api/userApi";
import './ProfilePage.css';

function ProfilePage() {
    const { user, setUser } = useStateContext();
    const apiURL = 'http://localhost:8000';
    const [payload, setPayload] = useState({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        image: user.image,
        _method: "PUT"
    });
    const [preview, setPreview] = useState(null);

    const validateInput = () => {
        if (payload.password && payload.password !== payload.password_confirmation) {
            alert("Password and Confirmation must be the same");
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateInput()) {
            updateUser(user.id, payload).then((res) => {
                console.log(res);
                setUser(res.data.data);
                localStorage.setItem("user", JSON.stringify(res.data.data));
            });
        }
    }

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
        setPayload({
            ...payload,
            image: file
        })
    }

    const handleChange = (e) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="profile-container">
                <form onSubmit={handleSubmit}>
                    <div className="title-profile">User Profile</div>
                    <div className="detail-profile">
                        <div className="profile-img">
                            <img src={preview ? preview : user.image ? `${apiURL}/storage/${user.image}` : '/src/assets/daffa.jpg'} alt="" />
                            <div className="update-img-pr">
                                <label className="update-img" htmlFor="image">
                                        Upload Image
                                </label>
                                <input hidden accept="image/*" type="file" name="image" id="image" onChange={handleUpload} />
                            </div>
                        </div>
                        <div className="profile-bio">
                            <div className="bio-container">
                                <div className="name-container">
                                    <div className="title-name">Name</div>
                                    <div className="box-name">
                                        <div className="icon-name"><img src="/src/assets/human.jpg" alt="" /></div>
                                        <div className="vertical-divider"></div>
                                        <input className="profile-input" type="text" name="name" value={payload.name} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="email-container">
                                    <div className="title-email">Email</div>
                                    <div className="box-email">
                                        <div className="icon-email"><img src="/src/assets/human.jpg" alt="" /></div>
                                        <div className="vertical-divider"></div>
                                        <input className="profile-input" type="text" name="email" value={payload.email} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="title-password">Password</div>
                    <div className="password-option">
                        <div className="option-1">
                            <div className="newpass-container">
                                <div className="title-newpass">New Password*</div>
                                <div className="box-newpass">
                                    <div className="icon-password"><img src="/src/assets/lock.jpg" alt="" /></div>
                                    <div className="vertical-divider"></div>
                                    <input className="profile-input" type="password" name="password" value={payload.password} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="confirmpass-container">
                                <div className="title-confirmpass">Confirm Password*</div>
                                <div className="box-confirmpass">
                                    <div className="icon-password"><img src="/src/assets/lock.jpg" alt="" /></div>
                                    <div className="vertical-divider"></div>
                                    <input className="profile-input" type="password" name="password_confirmation" value={payload.password_confirmation} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="update-pass">Update Profile</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfilePage;