import React from "react";
import ViewDropdown from "../../../public/assets/ViewDropdown.js";
import ListView from "../../../public/assets/ListView.js";
import GridView from "../../../public/assets/GridView.js";
import Properties from "../../../public/assets/Properties.js";
import Preview from "../../../public/assets/Preview.js";
import Settings from "../../../public/assets/Settings.js";

import { useState } from "react";
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiPopper from "@material-ui/core/Popper";
import MuiPaper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiIconButton from '@material-ui/core/IconButton';



function Header(props) {
  const [openMoreOption,setOpenMoreOption] = useState(false)
  const [anchorElMoreOption, setAnchorElMoreOption] = useState(null);

  const handleClickMoreOption = (e) => {
    setOpenMoreOption(!openMoreOption)
    setAnchorElMoreOption( e.currentTarget );
  }

  const onClickAwayMoreOption = () => {
    setOpenMoreOption(false)
  }
  return (
    <header>
      <div class="container">
        <div class="outer__header">
          <div class="left__header">
            <div class="logo__wrapper">
              <a onClick={props.goHome}>
                <img
                  className="header__icon"
                  src="/images/mydrive-logo.png"
                  alt="logo"
                />
              </a>
            </div>
            <div class="search__wrapper">
              <a href="#">
                <img src="/assets/searchicon.svg" alt="search" />
              </a>
              <input
                type="text"
                placeholder="Search your files"
                onChange={props.searchOnChange}
                value={props.search}
                placeholder="Search"
                type="text"
                onFocus={props.showSuggested}
                onBlur={props.hideSuggested}
              />
              <div
                class="search__files--dropdown"
                style={
                  props.state.focused && props.searchValue.length !== 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div
                  onMouseDown={props.selectSuggestedByParent}
                  class="elem__search--files search__filter--local"
                >
                  <a>
                    Search for{" "}
                    <span class="file__name">{props.searchValue}</span>
                    <span class="spacer">
                      <img src="/assets/spacer.svg" alt="spacer" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="right__header">
            <div class="profile__info">
              <div>
              <ClickAwayListener onClickAway={onClickAwayMoreOption}>
            <span>
              <MuiIconButton aria-label="changle visibility" onClick={handleClickMoreOption}>
              <ViewDropdown />
              </MuiIconButton>
              <MuiPopper
                open={openMoreOption} anchorEl={anchorElMoreOption} 
                placement={"bottom-start"} id="display-menu"
              >
                <MuiPaper elevation={10}>
                  <MuiMenuList id="simple-menu">
                    <MuiMenuItem alignItems='center' 
                  // disabled={clickedValues.length === 1 && editPlane === -1 ? false : true} onClick={onHandleCopy} 
                  >
                    <MuiListItemIcon>
                    <ListView />
                    </MuiListItemIcon>
                    <MuiListItemText>
                      List View
                    </MuiListItemText>
                  </MuiMenuItem>
                  <MuiMenuItem alignItems='center' 
                    // disabled={copied && planes.length !== limit ? false : true} onClick={onHandlePaste} 
                  >
                    <MuiListItemIcon>
                    <GridView />
                    </MuiListItemIcon>
                    <MuiListItemText>
                      Grid View
                    </MuiListItemText>
                  </MuiMenuItem>
                  
                  <MuiMenuItem alignItems='center' 
                    // disabled={copied && planes.length !== limit ? false : true} onClick={onHandlePaste} 
                  >
                    <MuiListItemIcon>
                    <Properties />
                    </MuiListItemIcon>
                    <MuiListItemText>
                    Properties
                    </MuiListItemText>
                  </MuiMenuItem>
                  
                </MuiMenuList>
              </MuiPaper>
            </MuiPopper>
          </span>
        </ClickAwayListener>  
               
              </div>
              <div >
                <Preview />
              </div>

              <div class="profile__wrapper">
                <div class="settings__button">
                  <a onClick={props.goToSettings}>
                   <Settings />
                  </a>
                </div>
              </div>
              <div class="profile__wrapper">
                <div class="profile__button">
                  <a style={{ backgroundColor: "#3c85ee" }}>
                    <span style={{ color: "#fff" }}>
                      {props.getProfilePic()}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
