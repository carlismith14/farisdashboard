import React, { useState } from "react";
import {
  IconButton,
  Popover,
  Box,
  List,
  Divider,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";


import logoImgSrc from "../img/Faris-white.png";



import { Mobile } from "../components/utility/responsive";

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

import AccessTimeIcon from "@mui/icons-material/AccessTime";


import GroupIcon from "@mui/icons-material/Group";

import StarIcon from "@mui/icons-material/Star";
import Home from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  return (
    <>
      <Mobile>
        <Box
          sx={{
            width: "100%",
          
          }}
        >
          <Box
            sx={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box
              sx={
                {
               
                }
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ width: 80 }}>
            
                  <IconButton
                    sx={{
                      color: "inherit",
                      transition: 'background 350ms',
                        borderRadius: 0,

                      "&:hover": {
                        backgroundColor: "none",
                      },
                      ...(anchorEl && {
                        backgroundColor: "rgb(0, 95, 169)",
                      }),
                    }}
                    disableRipple
                    size="large"
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                  >
                    <MenuIcon sx={{ width: "32px", height: "32px" }} />
                  </IconButton>
                </Box>
                <img
                  height={28}
                  style={{
                    marginLeft: "-50px",

                    "& svg": {
                      color: "red",
                    },
                  }}
            
                  src={logoImgSrc}
                  alt="ACEPro Logo"
                />
              

                <IconButton
                  sx={{
                    color: "inherit",
                    "&:hover": {
                      backgroundColor: "none",
                    },
                    "&.selected": {
                      // background: abiomedColors.mmPrimaryRoyal,
                      borderRadius: 0,
                    },
                  }}
                  disableRipple
                  size="large"
                >
             
                  <PersonIcon sx={{ width: "28px", height: "28px" }} />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{}}
                >
                  <Box
                    sx={{
                      background: "rgb(0, 95, 169)",
                      color: "white",
                    
                      padding: "16px",
                      transition: "background 350ms",
                      fontSize: "20px",
                      minWidth: "1000px",
                      height: "100%",

                      "& svg, span": {
                        color: "white",
                      },
                    }}
                  >
                    <List>
          
                      {listItem.map((item, index) => (
                        <ListItem
                          key={item.text}
                          disablePadding
                          sx={{ display: "block" }}
                        >
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
                        <ListItem
                          key={text}
                          disablePadding
                          sx={{ display: "block" }}
                        >
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
                            <ListItemText
                              primary={text}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Popover>

              </Box>
            </Box>
          </Box>
        </Box>
      </Mobile>
    </>
  );
};

export default Header;