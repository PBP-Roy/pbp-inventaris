import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Inventory",
        icon: <InventoryIcon />,
        link: "/inventory",
        children: [
            {
                title: "All Products",
                link: "/inventory/all"
            },
            {
                title: "Products-in",
                link: "/inventory/in"
            },
            {
                title: "Products-out",
                link: "/inventory/out"
            },
        ]
    },
    {
        title: "Reports",
        icon: <EqualizerIcon />,
        link: "/reports/in"
    }
];
