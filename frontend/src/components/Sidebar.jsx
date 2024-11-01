import React, {useState} from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";

function Sidebar() {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (key) => {
        setExpanded(expanded === key ? null : key);
    };
    return (
        <>
            <div className="Sidebar">
                <div className="SidebarHeader">
                    <div id="SidebarLogo"><img id="ImageLogo" src="src/assets/logo.jpg" alt="" /></div>{" "}
                    <div id="SidebarTitle"><h3>Inventory Management</h3></div>
                </div>
                <ul className="SidebarList">
                    {SidebarData.map((val, key)=> {
                        return (
                            <li className="row" key={key} id={window.location.pathname == val.link ? "active" : ""} onClick={()=> {if (val.children) {handleToggle(key);} else {window.location.pathname = val.link;}}}>
                                {" "}
                                <div id="icon">{val.icon}</div>{" "}
                                <div id="title">
                                    {val.title}
                                </div>
                                {val.children && expanded === key && (
                                    <ul className="SidebarChildren">
                                        {val.children.map((child, index) => (
                                            <li key={index} className="child-row" onClick={() => (window.location.pathname = child.link)}>
                                                {child.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default Sidebar;