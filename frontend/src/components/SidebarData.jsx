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
                link: "/inventory/all-products"
            },
            {
                title: "Products-in",
                link: "/inventory/products-in"
            },
            {
                title: "Products-out",
                link: "/inventory/products-out"
            },
            {
                title: "Products-Broken",
                link: "/inventory/products-broken"
            }
        ]
    },
    {
        title: "Reports",
        icon: <EqualizerIcon />,
        link: "/reports"
    }
];
