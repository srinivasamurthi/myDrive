import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "../../../public/assets/Menu";
import SearchBar from "material-ui-search-bar";
import Properties from "../../../public/assets/Properties.js";
import ViewDropdown from "../../../public/assets/ViewDropdown";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiMenuList from "@material-ui/core/MenuList";
import MuiPopper from "@material-ui/core/Popper";
import MuiPaper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useState } from "react";
import ListView from "../../../public/assets/ListView.js";
import GridView from "../../../public/assets/GridView.js";
import { setViewMode } from "../../actions/viewMode";
import {connect} from "react-redux";
import Preview from "../../../public/assets/Preview";
import {Avatar, CssBaseline, Drawer} from "@material-ui/core";
import LeftSection from "../LeftSection";
import { styled, useTheme } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { ChevronRight } from "@material-ui/icons";
import MainSection from "../MainSection/MainSection";
import { makeStyles } from "@material-ui/core/styles";


const drawerWidth = 240;

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      // width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const useStyles = makeStyles({
  
  paper: {
    background: "gray"
  }
});
const Header = (props) => {
  const [openMoreOption, setOpenMoreOption] = useState(false);
  const [anchorElMoreOption, setAnchorElMoreOption] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickMoreOption = (e) => {
    setOpenMoreOption(!openMoreOption);
    setAnchorElMoreOption(e.currentTarget);
  };

  const onClickAwayMoreOption = () => {
    setOpenMoreOption(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  const classes = useStyles();


  return (
    <Box sx={{ display: 'flex' }} style={{ backgroundColor: "#808080" }}>
      <CssBaseline />
      <MuiAppBar position="fixed" style={{ backgroundColor: "#808080" }} open={open}>
        <Toolbar>
           <IconButton
             onClick= {()=> setOpen(!open)}
             edge="start"
             sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton> 
          <SearchBar style={{width:"500px"}}  />
          <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: "#808080" }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }} style={{ backgroundColor: "#808080" }}>
            <ClickAwayListener onClickAway={onClickAwayMoreOption} style={{ backgroundColor: "#808080" }}>
              <span>
                <IconButton
                  aria-label="changle visibility"
                  onClick={handleClickMoreOption}
                >

                  <ViewDropdown />
                </IconButton>
                <MuiPopper
                  open={openMoreOption}
                  anchorEl={anchorElMoreOption}
                  placement={"bottom-start"}
                  id="display-menu"
                  style={{ backgroundColor: "#808080" }}
                >
                  <MuiPaper elevation={10} style={{ backgroundColor: "#808080" }}>
                    <MuiMenuList id="simple-menu">
                      <MuiMenuItem
                        alignItems="center"
                        onClick= {() => props.dispatch(setViewMode("list"))}
                        // disabled={clickedValues.length === 1 && editPlane === -1 ? false : true} onClick={onHandleCopy}
                      >
                        <MuiListItemIcon>
                          <ListView />
                        </MuiListItemIcon>
                        <MuiListItemText>List View</MuiListItemText>
                      </MuiMenuItem>
                      <MuiMenuItem
                        alignItems="center"
                        onClick= {() => props.dispatch(setViewMode("grid"))}
                        // disabled={copied && planes.length !== limit ? false : true} onClick={onHandlePaste}
                      >
                        <MuiListItemIcon>
                          <GridView />
                        </MuiListItemIcon>
                        <MuiListItemText>Grid View</MuiListItemText>
                      </MuiMenuItem>

                      <MuiMenuItem
                        alignItems="center"
                        onClick= {() => props.dispatch(setViewMode("properties"))}
                      >
                        <MuiListItemIcon>
                          <Properties />
                        </MuiListItemIcon>
                        <MuiListItemText>Properties</MuiListItemText>
                      </MuiMenuItem>
                    </MuiMenuList>
                  </MuiPaper>
                </MuiPopper>
              </span>
            </ClickAwayListener>

            <IconButton>
             <Preview />
            </IconButton>
            <Avatar
            sx={{ width: 10, height: 10 }} >
            <span style={{color:"#fff"}}>{props.getProfilePic()}</span>
          </Avatar>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Drawer         classes={{ paper: classes.paper }}

      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          
         
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      // style={{backgroundColor:"gray"}}
      
      >
        <DrawerHeader>
        {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton> */}
        </DrawerHeader>
        <LeftSection />
      </Drawer>
      <Main  open={open}>
      <MainSection />
      </Main>
      
    </Box>
  );
};

export default connect() (Header);

