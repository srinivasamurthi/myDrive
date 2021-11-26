import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiGetAppIcon from '@material-ui/icons/GetApp';
import MuiShareIcon from '@material-ui/icons/Share';
import MuiDeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MuiMoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';

import MuiPopper from "@material-ui/core/Popper";
import MuiPaper from '@material-ui/core/Paper';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiCropIcon from '@material-ui/icons/Crop';

import {useState} from "react";


function Actions (props) {

  const [openMoreOption,setOpenMoreOption] = useState(false)
  const [anchorElMoreOption, setAnchorElMoreOption] = useState(null);

  const handleClickMoreOption = (e) => {
    setOpenMoreOption(!openMoreOption)
    setAnchorElMoreOption( e.currentTarget );
  }

  const onClickAwayMoreOption = () => {
    setOpenMoreOption(false)
  }


    return(
        <div>
          <MuiIconButton 
                // onClick={props.downloadSelected}
            >
            <MuiGetAppIcon fontSize="medium" />
          </MuiIconButton>
          <MuiIconButton>
            <MuiShareIcon fontSize="medium" />
          </MuiIconButton>
          <ClickAwayListener onClickAway={onClickAwayMoreOption}>
            <span>
              <MuiIconButton aria-label="changle visibility" onClick={handleClickMoreOption}>
                <MuiMoreVertOutlinedIcon />
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
                      <MuiFileCopyOutlinedIcon />
                    </MuiListItemIcon>
                    <MuiListItemText>
                      Copy
                    </MuiListItemText>
                  </MuiMenuItem>
                  <MuiMenuItem alignItems='center' 
                    // disabled={copied && planes.length !== limit ? false : true} onClick={onHandlePaste} 
                  >
                    <MuiListItemIcon>
                      <MuiCropIcon />
                    </MuiListItemIcon>
                    <MuiListItemText>
                      Cut
                    </MuiListItemText>
                  </MuiMenuItem>
                  <MuiMenuItem alignItems='center'
                    // onClick={props.deleteSelected}
                    >
                    <MuiListItemIcon>
                      <MuiDeleteForeverIcon fontSize="medium" />
                    </MuiListItemIcon>
                    <MuiListItemText>
                      Delete
                    </MuiListItemText>
                  </MuiMenuItem>
                </MuiMenuList>
              </MuiPaper>
            </MuiPopper>
          </span>
        </ClickAwayListener>    
      </div>
    )
}

export default Actions;