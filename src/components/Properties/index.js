import React from "react";
import {useState, useEffect} from 'react';


import {setSelected} from "../../actions/selectedItem"

import MuiTypography from '@material-ui/core/Typography'
import MuiInput from '@material-ui/core/Input';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiCheckbox from '@material-ui/core/Checkbox';
import HeaderButton from "../ActionButtons/HeaderButtons";
import MuiBox from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import MuiModal from '@material-ui/core/Modal';
import MuiGrid from '@material-ui/core/Grid';
import MuiAvatar from '@material-ui/core/Avatar'

import {red} from '@material-ui/core/colors';


import { Table } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

import {connect} from "react-redux";

import Actions from '../ActionButtons'

import {history} from "../../routers/AppRouter";

import env from "../../enviroment/envFrontEnd";


import {setViewContent, removeViewContent} from "../../actions/viewFileContent";


const GridView = (props) => {

  const files = [];

  console.log("files", props.files)
  console.log("folders", props.folders)

  const findItemType = (name) => {
    const filenameSplit = name.split(".");

        if (filenameSplit.length > 1) {
            const extension = filenameSplit[filenameSplit.length - 1]
            return extension.toUpperCase();
        } else {

            return "Folder"
        }
 
  }

  const fileSize = (size) => {
    if (size > 1024) {
      const kbSize = size / 1024
      if (kbSize > 1024) {
        const mbSize = kbSize / 1024
        if(mbSize > 1024){
          const gbSize = mbSize / 1024;
          return `${ (Math.round(gbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} GB`
        }
        return `${ (Math.round(mbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} MB`
      }
      return `${Math.round(kbSize)} kB`
    }

    if (size === 0)
      return("");
    return `${size} B`
  }

  props.files.map(item => 
    {
      const newFile = {_id: item._id, name: item.filename, date:item.uploadDate.split(/T/)[0], size: fileSize(item.metadata.size), type: findItemType(item.filename)}
      files.push(newFile)
    })

    props.folders.map(item => 
      {
        const newFile = {_id: item._id, name: item.name, date:item.updatedAt.split(/T/)[0], size: fileSize(0), type: findItemType(item.name)}
        files.push(newFile)
      })

    const [loading,setLoading] = useState(false);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortType, setSortType] = useState('asc');
    const [multichecked, setMultichecked] = useState(false);
    const [multiIndeterminate, setMuiltInterdeterminate] = useState(props.selected.length === files.length || props.selected.length === 0 ? false : true);


    useEffect(() => {
      if(files.length > 1)
        setMultichecked(props.selected.length === files.length ? true : false); 
      
      setMuiltInterdeterminate(props.selected.length === files.length || props.selected.length === 0 ? false : true);
      
    },[props.selected]);
    
    const getData = () => {
      // console.log(sortColumn, sortType)
      if (sortColumn && sortType) {
        return files.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt(0);
          }
          if (typeof y === 'string') {
            y = y.charCodeAt(0);
          }
          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return files;
    }

    const handleCloseModal = () => {
      props.dispatch(removeViewContent())
    }
    
    const handleOpen = (file) => {

      // console.log("folder", file)
      if(file.type === "Folder"){
        const id = file._id;
        const folderPush = env.googleDriveEnabled ? `/folder-google/${id}` : (env.activeSubscription || !env.commercialMode) ? `/folder/${id}` : `/folder-personal/${id}`;
        history.push(folderPush)
      }

      else{

      if(file.type === "JPG" || file.type === "PDF" || file.type === "DOC" || file.type === "DOCX" || file.type === "PNG"){
       props.dispatch(setViewContent(props.files.find(item => item._id === file._id),true))       
      }

      else{
        props.dispatch(setViewContent(props.files.find(item => item._id === file._id),false))
      }
    }
  }

    const handleSortColumn = (sortColumnsa, sortTypesa) => {
    
      // console.log("sad",sortColumn)
      setLoading(true)
  
      setTimeout(() => {
        // console.log("sad",sortColumnsa)
        setSortColumn(sortColumnsa);
        setSortType(sortTypesa);
        setLoading(false)
      }, 500);
  
      // console.log("sad",sortColumn)
    }

    const handleCheckAll = () => {

      if(multiIndeterminate === false){
        files.map(item => fileSelector(item._id))
      }

      else{
          files.map(item => {
            if(props.selected.includes(item._id) === false)
              fileSelector(item._id)
          })
      }

    };

  const fileSelector = (fileId) => {
    props.dispatch(setSelected(fileId))
  }

 

  
  console.log("sasdadasdsdas", props.viewContent)
  return(
      <div  style={{width:"1250px", height:"800px", backgroundColor:"#808080",  paddingLeft:"250px"}}>
        <div  style={{ width:"1000px",marginLeft:"15px"}}>
            <div style={{borderBottom: "2px solid"}}>
            <MuiTypography variant="h5" style={{marginTop:"40px",marginBottom:"20px"}}>General Details</MuiTypography>
            <MuiGrid container>
                <MuiGrid item container xs={6}>
                    <MuiGrid item container direction="column">
                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Type</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>
                       
                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Size</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>

                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Location</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>
                     
                    </MuiGrid>
                </MuiGrid>

                <MuiGrid item container xs={6}>
                    <MuiGrid item container direction="column">
                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Opened</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>
                       
                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Modified</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>

                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Created</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>
                     
                    </MuiGrid>
                </MuiGrid>
            </MuiGrid>
            </div>

            <div style={{borderBottom: "2px solid"}}>
            <MuiTypography variant="h5" style={{marginTop:"40px",marginBottom:"20px"}}>Access</MuiTypography>
            <MuiGrid container>
                <MuiGrid item container xs={6}>
                    <MuiGrid item container direction="column">
                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Owner</MuiTypography>
                            </MuiGrid>
                            
                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                        </MuiGrid>
                     
                    </MuiGrid>
                </MuiGrid>

                <MuiGrid item container xs={6}>
                    <MuiGrid item container direction="column">
                        <MuiGrid item container style={{marginBottom:"20px"}}>
                            <MuiGrid item xs={6}>
                                <MuiTypography>Who can acess</MuiTypography>
                            </MuiGrid>

                            <MuiGrid item xs={6}>
                                <MuiTypography>- Not Available -</MuiTypography>
                            </MuiGrid>
                            
                            {/* <MuiGrid item container xs={6}>
                                <MuiGrid item xs={2}>
                                    <MuiAvatar style={{ backgroundColor: red[500], width: 25, height: 25 }}>
                                        R
                                    </MuiAvatar>
                                </MuiGrid>
                                <MuiGrid item xs={5}>
                                    <MuiGrid container justify="center" alignItems="center">
                                        <MuiAvatar style={{ backgroundColor: red[500], width: 30, height: 30 }} aria-label="recipe">
                                            R
                                        </MuiAvatar>
                                        <MuiAvatar style={{ backgroundColor: red[500], width: 30, height: 30 }} aria-label="recipe">
                                            S
                                        </MuiAvatar>
                                        <MuiAvatar style={{ backgroundColor: red[500], width: 30, height: 30 }} aria-label="recipe">
                                            T
                                        </MuiAvatar>
                                    </MuiGrid>
                                </MuiGrid>
                                <MuiGrid item xs={5}></MuiGrid>
                            </MuiGrid>
                            */}
                        </MuiGrid>
                      </MuiGrid>
                    </MuiGrid>
            </MuiGrid>
            </div>

            <div >
            <MuiTypography variant="h5" style={{marginTop:"40px",marginBottom:"20px"}}>Tags</MuiTypography>
            <div style={{display:"flex", justifyContent: "center"}}></div>
          </div>

        </div>
</div>
  )
      };

      const mapStateToProp = (state) => ({
        viewContent : state.viewFileContent.viewContent,
        modalOpenBoolean : state.viewFileContent.modalOpenBoolean,
        fileOpenBoolean : state.viewFileContent.fileOpenBoolean,

        files: state.files,
    folders: state.folders,
    selected: state.selectedItem.selected,
    resetItems: state.main.resetItems,
    parent: state.parent.parent,
    listView: state.filter.listView,
    sortBy: state.filter.sortBy,
    search: state.filter.search,
    isGoogle: state.filter.isGoogle,
    loadMoreItems: state.main.loadMoreItems,
    loading: state.main.loading,
    loadingMoreItems: state.main.loadingMoreItems
    })

export default connect(mapStateToProp) (GridView);
