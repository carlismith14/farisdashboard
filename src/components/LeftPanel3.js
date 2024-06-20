import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DataPage from "./DataPage";
import { Stack, Box, Typography } from "@mui/material";

import {
  abiomedColors,
  desktopGlobals,
  drawerStyles,
  searchField,
} from "./constants/styles";

import logoImgSrc from "../img/Faris-white.png";

import {
  CustomViewIcon,
  DownloadIcon,
  MinimalViewIcon,
  ArrowLeftIcon,
} from "./utility/CustomIcons";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import IconButton from '@mui/material/IconButton';

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import HomeIcon from "@mui/icons-material/Home";

import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Home from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const listItem = [
  {
    text: "Home",
    icon: Home,
  },

  {
    text: "Recently Viewed",
    icon: AccessTimeIcon,
  },
  {
    text: "Shared Items",
    icon: GroupIcon,
  },
  {
    text: "Starred",
    icon: StarIcon,
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  //   padding: theme.spacing(0, 4),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // background:"pink",

  "& .MuiPaper-root": {
    // background: "inherit",
    background: "rgb(0, 95, 169)",
    // height:"80vh"
    position: "relative",
  },

  "& svg, span": {
    color: "#fff",
    // color: "#D9D9D9",
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LeftPanel3() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ width: "32px", height: "32px" }} />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: desktopGlobals.headerHeight,
              marginLeft: "0px",
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              sx={{
                height: "45px",
                marginTop: "5px",
              }}
              spacing={3}
            >
              <img
                src={logoImgSrc}
                alt="Abiomed Logo"
                height={32}
                sx={{ marginLeft: "0" }}
              />

              <Box
                sx={{
                  background: abiomedColors.mmPrimaryRoyal,
                  width: "1px",
                  height: "100%",
                }}
              ></Box>

              <Box
                sx={{
                  position: "relative",
                  top: "-4px",
                }}
              >
                <Typography
                  sx={{
                    margin: 0,
                    "& span:first-child": {
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginRight: "8px",
                    },
                    "& button": {
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: "14px",
                      fontWeight: "normal",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <span>Good Afternoon, User !</span>
                </Typography>

                <button type="button">logout</button>

                <p>
                  <span></span>
                </p>
              </Box>
            </Stack>
            <Stack direction="row" gap={1}>
              <PersonIcon sx={{ width: "30px", height: "30px" }} />
              <SettingsIcon sx={{ width: "30px", height: "30px" }} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ height: "96px" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listItem.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={item.text === "Shared Items" && true}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,

                  " &.Mui-selected": {
                    background: "rgba(40, 125, 189, 1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Trash"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, padding: "24px 0px" }}>
        <DrawerHeader />

        <DataPage></DataPage>
      </Box>
    </Box>
  );
}
