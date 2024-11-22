import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { useStateContext } from "../contexts/ContextProvider";

function Sidebar() {
    const [expanded, setExpanded] = useState(null);
    const NavigateTo = useNavigate();
    const { items, logs, categories, magnitudes } = useStateContext();

    const handleToggle = (key) => {
        setExpanded(expanded === key ? null : key);
    };

  return (
    <div className="Sidebar">
      <div className="SidebarHeader">
        <div id="SidebarLogo">
          <img id="ImageLogo" src="src/assets/new-logo.jpg" alt="" />
        </div>
        <div id="SidebarTitle">
          <h3>Inventory Management</h3>
        </div>
      </div>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => (
          <li key={key}>
            <div
              className={`row ${
                val.title == "Inventory"
                  ? window.location.pathname.includes(val.link)
                    ? "active"
                    : ""
                  : window.location.pathname == val.link
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                if (val.children) {
                  handleToggle(key);
                } else {
                  NavigateTo(val.link);
                }
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </div>
            {val.children && expanded === key && (
              <ul className="SidebarChildren">
                {val.children.map((child, index) => (
                  <Link
                    className="active"
                    key={index}
                    to={child.link}
                    style={{ textDecoration: "none" }}
                  >
                    <li
                      className={`child-row ${
                        window.location.pathname.includes(child.link)
                          ? "active"
                          : ""
                      }`}
                    >
                      {child.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
        ))}
        <button onClick={(e) => {
            e.preventDefault();
            console.log("Items: ", items);
            console.log("Logs: ", logs);
            console.log("Categories: ", categories);
            console.log("Magnitudes: ", magnitudes);
        }}>Check State</button>
      </ul>
    </div>
  );
}

export default Sidebar;
