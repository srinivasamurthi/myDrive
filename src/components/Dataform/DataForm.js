
import React from "react";
import {useState, useEffect} from 'react';

import {setSelected} from "../../actions/selectedItem"

import MuiTypography from '@material-ui/core/Typography'
import MuiCheckbox from '@material-ui/core/Checkbox';
import HeaderButton from "../ActionButtons/HeaderButtons";
import MuiBox from '@material-ui/core/Box';
import MuiModal from '@material-ui/core/Modal';
import { Typography } from "@material-ui/core";



import { Table } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

import {connect} from "react-redux";

import Actions from '../ActionButtons'

import {history} from "../../routers/AppRouter";

import env from "../../enviroment/envFrontEnd";

import {setViewContent, removeViewContent} from "../../actions/viewFileContent";

const DataForm = (props) => {

  const files = [];

  const { Column, HeaderCell, Cell, Pagination } = Table;

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

  props.files.map(item => 
    {
      const newFile = {_id: item._id, name: item.filename, date:item.uploadDate.split(/T/)[0], size: item.metadata.size, type: findItemType(item.filename)}
      files.push(newFile)
    })

    props.folders.map(item => 
      {
        const newFile = {_id: item._id, name: item.name, date:item.updatedAt.split(/T/)[0], size: 0, type: findItemType(item.name)}
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
  
  console.log("sasdadasdsdas", props.viewContent)
  return(
    
      <div  style={{width:"1250px", height:"800px", backgroundColor:"#808080", paddingLeft:"250px", marginTop:"40px"}}>
          <div  style={{ width:"900px", backgroundColor:"#808080" }}>
            <div style={{width:"900px", display: "flex", justifyContent: "flex-end", backgroundColor:"#808080"}}>
               <HeaderButton />
            </div>
          <Table
                height={600}
                virtualized = {true}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                shouldUpdateScroll={false}
                style={{ backgroundColor: "#808080" }}
                // onRowClick={data => {
                //   onHandleCheckBox(data.id)
                // }}
              >
                
                  <Column width={100} style={{backgroundColor:"gray"}}>
                  <HeaderCell> <MuiCheckbox
                        checked={multichecked}
                        indeterminate={multiIndeterminate}
                        onChange={handleCheckAll}
                      /> </HeaderCell>
                  <Cell>
      
                  {(rowData )=> {
                      // function handleAction() {
                      //   alert(`id:${rowData.id}`);
                      // }
                      return (
                        <MuiCheckbox
                        checked={props.selected.includes(rowData._id)}
                        onChange={() => fileSelector(rowData._id)}
                      />
                      );
                    }}
      
          </Cell>
          </Column>
      
                <Column width={300} align="center" sortable style={{backgroundColor:"gray"}}>
                  <HeaderCell>
                  <Typography style={{color:"white"}}>
                  Name
                    </Typography></HeaderCell>
                  <Cell dataKey="name">
                    {(rowData) => {
                      return(
                        <p>        
                          <MuiTypography style={{marginTop:"10px"}}  onDoubleClick={() => {handleOpen(rowData)}} >
                           {rowData.name}
                        </MuiTypography>
                        </p>
                      )
                    }}
                  </Cell>
                </Column>
      
                <Column width={100} align="center" sortable style={{backgroundColor:"gray"}}>
                  <HeaderCell>
                  <Typography style={{color:"white"}}>
                  Type
                    </Typography>
                    </HeaderCell>
                  <Cell dataKey="name">
                    {(rowData) => {
                      return(
                        <p>        
                          <MuiTypography style={{marginTop:"10px"}}>
                           {rowData.type}
                        </MuiTypography>
                        </p>
                      )
                    }}
                  </Cell>
                </Column>
      
                <Column width={100} align="center" sortable style={{backgroundColor:"gray"}}>
                  <HeaderCell>
                  <Typography style={{color:"white"}}>
                  Size
                    </Typography></HeaderCell>
                  <Cell dataKey="size">
                  {(rowData )=> {
                      return (
                        <p>
                          {fileSize(rowData.size)}
                      </p>
                      );
                    }}
                  </Cell>
                </Column>
      
                <Column width={100} align="center" sortable style={{backgroundColor:"gray"}}>
                  <HeaderCell>
                  <Typography style={{color:"white"}}>
                  Creacted on
                    </Typography>
                  </HeaderCell>
                  <Cell dataKey="date">
                  {(rowData )=> {
                      return (
                        <p>
                          {rowData.date}
                      </p>
                      );
                    }}
                  </Cell>
                </Column>
      
                <Column width={200} align="center" style={{backgroundColor:"gray"}}>
                  <HeaderCell>
                  <Typography style={{color:"white"}}>
                  Action
                    </Typography></HeaderCell>
      
                  <Cell backgroundColor="#808080">
                    {(rowData) => {
      
                      return (
                        <div style={{marginTop:"-5px", backgroundColor:"#808080"}}>
                        <Actions item={props.files.find(item => item._id === rowData._id)}/>
                         {/* deleteSelected={() => deleteItem(rowData.id)} downloadSelected = {() => downloadItem(rowData.type,rowData.link)}/> */}
                      </div>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
      
          
              <MuiModal
        open={props.modalOpenBoolean}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MuiBox sx={{position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#808080',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,}}>
          {/* <MuiTypography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </MuiTypography> */}
          <MuiTypography id="modal-modal-description" sx={{ mt: 2 }}>
            This file is not supported.
          </MuiTypography>
        </MuiBox>
      </MuiModal>


          </div>
      


      
         
</div>


  )
      };

      
      const mapStateToProp = (state) => ({
        viewContent : state.viewFileContent.viewContent,
        modalOpenBoolean : state.viewFileContent.modalOpenBoolean,
        fileOpenBoolean : state.viewFileContent.fileOpenBoolean,
    })

export default connect(mapStateToProp) (DataForm);
