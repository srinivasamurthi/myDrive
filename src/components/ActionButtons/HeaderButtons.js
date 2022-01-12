import React from "react";
import MuiIconButton from "@material-ui/core/IconButton";
import MuiGetAppIcon from "@material-ui/icons/GetApp";
import MuiShareIcon from "@material-ui/icons/Share";
import MuiDeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MuiMoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import LeftSection from "../LeftSection";
// import MuiContentCopyIcon from '@material-ui/icons/ContentCopy';
// import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiMenuList from "@material-ui/core/MenuList";
import { Box } from "@material-ui/core";
import { CreateNewFolderOutlined } from "@material-ui/icons";
import FileCopyOutlined from "@material-ui/icons/FileCopyOutlined";
// import { InsertDriveFileOutlined } from "@material-ui/icons";
import { NoteAddOutlined } from "@material-ui/icons";
import { FileUploadOutlined } from "@material-ui/icons";
import Upload from "../../Icons/Upload";
import ContentPaste from "../../Icons/ContentPaste";


import MuiPopper from "@material-ui/core/Popper";
import MuiPaper from "@material-ui/core/Paper";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MuiFileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import MuiFileCopyIcon from "@material-ui/icons/FileCopy";
import Divider from "@material-ui/core/Divider";
import MuiCropIcon from "@material-ui/icons/Crop";
import { useEffect, useState } from "react";


import {showAddOptions} from "../../actions/addOptions";
import {startAddFile} from "../../actions/files";
import {startAddFolder} from "../../actions/folders"
import Swal from "sweetalert2";
import {connect} from "react-redux";

import { openUploadOverlay, setLeftSectionMode } from "../../actions/main";


  class HeaderButton extends React.Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.uploadInput = React.createRef();

        this.leftSectionRef = React.createRef()

        this.state = {
            open: false,
            hideFolderTree: false,
            setOpenMoreOption: false,
            setAnchorElMoreOption: null,
            openMoreOption:false,
            anchorElMoreOption : null,

            
        }
    }

    
  //   [openMoreOption,setOpenMoreOption] = useState(false);
  // [anchorElMoreOption, setAnchorElMoreOption] = useState(null);

   handleClickMoreOption = (e) => {
     this.setState((state) => ({
      openMoreOption : !state.openMoreOption,
      anchorElMoreOption : e.currentTarget
     }));
    // setOpenMoreOption(!openMoreOption)
    // setAnchorElMoreOption( e.currentTarget );
  };

 onClickAwayMoreOption = () => {
   this.setState({
    openMoreOption:false
   });
    // setOpenMoreOption(false)
  };
    

     createFolder = async(e) => {

        let inputValue = ""

        const { value: folderName} = await Swal.fire({
            title: 'Enter Folder Name',
            input: 'text',
            inputValue: inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Please Enter a Name'
              }
            }
          })

        if (folderName === undefined || folderName === null) {

            return;
        }

        const parent = this.props.parent;
        const owner = this.props.auth.id;
        const parentList = this.props.parentList;
        const isGoogle = this.props.isGoogle;

        this.props.dispatch(startAddFolder(folderName, owner, parent, parentList, isGoogle));
        this.showDropDown();
    }

    handleClickOutside = (e) => {

        if (this.leftSectionRef && !this.leftSectionRef.current.contains(event.target)) {
          
            if (this.props.leftSectionMode === 'open') {
                this.props.dispatch(setLeftSectionMode('close'))
            }
        }
    }

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutside);

        const hideFolderTree = localStorage.getItem("hide-folder-tree");

        if (hideFolderTree) {

            this.setState(() => ({
                hideFolderTree
            }))
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    addButtonEvent = () => {
        
        const currentAddOptions = !this.props.showAddOptions
        this.props.dispatch(showAddOptions(currentAddOptions))
    }

    handleUpload = (e) => {
        e.preventDefault();

        this.props.dispatch(startAddFile(this.uploadInput.current, this.props.parent, this.props.parentList, this.props.storageSwitcher))
        this.uploadInput.current.value = ""
    }

    showDropDown = () => {

        this.setState(() => {
            return {
                ...this.state,
                open: !this.state.open
            }
        })
    }

    showUploadOverlay = () => {

        this.showDropDown();
        this.props.dispatch(openUploadOverlay());
    }
    

    render() {

        return ( <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor:"gray",
          color: "text.secondary",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <MuiIconButton onClick={this.createFolder} >
          <CreateNewFolderOutlined  />
          </MuiIconButton>
          <MuiIconButton disabled="true" >
          <NoteAddOutlined />
          </MuiIconButton>
          <MuiIconButton onClick={this.showUploadOverlay} >
          <Upload />
          </MuiIconButton>
          <MuiIconButton disabled="true">
          <ContentPaste />
          </MuiIconButton>
        
          <Divider orientation="vertical" variant="middle" flexItem />
      
        <MuiIconButton disabled="true">
          <MuiShareIcon fontSize="medium" />
        </MuiIconButton>
        <MuiIconButton disabled="true"
        // onClick={props.downloadSelected}
        >
          <MuiGetAppIcon fontSize="medium" />
        </MuiIconButton>
        <MuiIconButton disabled="true"
        // onClick={props.downloadSelected}
        >
          <MuiFileCopyIcon />
        </MuiIconButton>
       
        <ClickAwayListener onClickAway={this.onClickAwayMoreOption}>
            <span>
              <MuiIconButton aria-label="changle visibility" onClick={this.handleClickMoreOption}>
                <MuiMoreVertOutlinedIcon />
              </MuiIconButton>
              <MuiPopper
                // open={this.openMoreOption} anchorEl={this.anchorElMoreOption} 
                // placement={"bottom-start"} id="display-menu"
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
      </Box>
     
    
  );
}
  }
  // const [openMoreOption,setOpenMoreOption] = useState(false)
  // const [anchorElMoreOption, setAnchorElMoreOption] = useState(null);

  // const handleClickMoreOption = (e) => {
  //   setOpenMoreOption(!openMoreOption)
  //   setAnchorElMoreOption( e.currentTarget );
  // }

  // const onClickAwayMoreOption = () => {
  //   setOpenMoreOption(false)
  // }

  const connectPropToState = (state) => ({
    auth: state.auth,
    parent: state.parent.parent,
    parentList: state.parent.parentList,
    storage: state.storage,
    showAddOptions: state.addOptions.showAddOptions,
    isGoogle: state.filter.isGoogle,
    storageSwitcher: state.storageSwitcher.selected,
    leftSectionMode: state.main.leftSectionMode
})
export default connect(connectPropToState)(HeaderButton);
