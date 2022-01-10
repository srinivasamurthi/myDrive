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

import axios from "../../axiosInterceptor";

import {useState} from "react";

import Swal from "sweetalert2";
import {editFileMetadata, startRemoveFile, startRenameFile} from "../../actions/files"
import { startRemoveFolder, startRenameFolder } from "../../actions/folders";
import {connect} from "react-redux";

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

  const downloadSelected = () => {
    const isGoogle = props.item.metadata.drive;
    const isGoogleDoc = props.item.metadata.googleDoc;
    const isPersonal = props.item.metadata.personalFile;  
  
    const url = isGoogle ? `/file-service-google/full-thumbnail/${props.item._id}` 
          : !isPersonal ? `/file-service/full-thumbnail/${props.item._id}` : `/file-service-personal/full-thumbnail/${props.item._id}`;
    
          axios.get(url).then((response) => {

            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = url;
            link.setAttribute('type', 'hidden');
            link.setAttribute("download", true);
            link.click();
          })
  }

  const deleteItem = async() => {

    const parent = props.item.metadata.parent;

    Swal.fire({
        title: 'Confirm Deletion',
        text: "You cannot undo this action",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete'
      }).then((result) => {
        if (result.value) {

            // props.item ? 
            props.dispatch(startRemoveFile(props.item._id, props.item.metadata.drive, props.item.metadata.personalFile)) 
            // :
            // props.dispatch(startRemoveFolder(props.item.id, [...props.item.data.parentList, this.props.item.id], this.props.item.drive, parent, props.item.data.metadata.personalFolder));
        }
    })
}

  console.log("item", props.item);

    return(
        <div>
          <MuiIconButton disabled={!props.item}
                onClick={() => downloadSelected(props.item)}
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
                    onClick={deleteItem}
                    disabled={!props.item}
                    >
                    <MuiListItemIcon >
                      <MuiDeleteForeverIcon fontSize="medium" />
                    </MuiListItemIcon>
                    <MuiListItemText >
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

export default connect()(Actions);