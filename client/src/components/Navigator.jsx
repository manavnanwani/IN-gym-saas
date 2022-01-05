import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "MAIN",
    children: [
      {
        id: "Dashboard",
        icon: <PeopleIcon />,
        active: true,
        link: "/dashboard",
      },
      {
        id: "Membership or Package",
        icon: <DnsRoundedIcon />,
        link: "/membership",
      },
      { id: "Members", icon: <PermMediaOutlinedIcon />, link: "/members" },
      { id: "Staff Member", icon: <PublicIcon />, link: "/staff" },
      { id: "Class Schedule", icon: <SettingsEthernetIcon />, link: "/class" },
      {
        id: "POS",
        icon: <SettingsInputComponentIcon />,
        link: "/products",
      },
    ],
  },
  {
    id: "SECONDARY",
    children: [
      { id: "Settings", icon: <SettingsIcon /> },
      { id: "Log Out", icon: <TimerIcon /> },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <img
            src="https://gym-livid.vercel.app/artemis-assets/logos/artemis-logo.svg"
            alt="logo"
          />
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, link }) => (
              <Link
                to={{ pathname: link }}
                key={childId}
                style={{ textDecoration: "none" }}
              >
                <ListItem disablePadding>
                  {/* <ListItemButton selected={active} sx={item}> */}
                  <ListItemButton sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
