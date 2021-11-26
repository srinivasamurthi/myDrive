import FileItem from ".././FileItem";
import FolderItem from ".././FolderItem";
import React from "react";
import {useState, useEffect} from 'react';
import QuickAccess from "../QuickAccess";
import ParentBar from "../ParentBar";
import Spinner from "../Spinner";
import SpinnerImage from "../SpinnerImage";

import {setSelected} from "../../actions/selectedItem"

import MuiTypography from '@material-ui/core/Typography'
import MuiInput from '@material-ui/core/Input';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiCheckbox from '@material-ui/core/Checkbox';


import { Table } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

import {connect} from "react-redux";

import Actions from '../ActionButtons'

const DataForm = (props) => {

  const files = [];

  const { Column, HeaderCell, Cell, Pagination } = Table;

  console.log("selected", props.selected)

  props.files.map(item => 
    {
      const newFile = {_id: item._id, name: item.filename, date:item.uploadDate.split(/T/)[0], size: item.metadata.size}
      files.push(newFile)
    })

    props.folders.map(item => 
      {
        const newFile = {_id: item._id, name: item.name, date:item.updatedAt.split(/T/)[0], size: 0}
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
      console.log(sortColumn, sortType)
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

    const handleSortColumn = (sortColumnsa, sortTypesa) => {
    
      console.log("sad",sortColumn)
      setLoading(true)
  
      setTimeout(() => {
        console.log("sad",sortColumnsa)
        setSortColumn(sortColumnsa);
        setSortType(sortTypesa);
        setLoading(false)
      }, 500);
  
      console.log("sad",sortColumn)
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

  const findItemType = (name) => {
    const filenameSplit = name.split(".");

        if (filenameSplit.length > 1) {
            const extension = filenameSplit[filenameSplit.length - 1]
            return extension.toUpperCase();
        } else {

            return "Folder"
        }

  }
  
  return(
      <div>
        {/* <div><p>Files</p></div> */}
      <div style={{height:"400px", width:"1300px" }}>
    <Table
          height={400}
          virtualized = {true}
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          shouldUpdateScroll={false}
          // onRowClick={data => {
          //   onHandleCheckBox(data.id)
          // }}
        >
          
            <Column width={100} >
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

          <Column width={400} align="center" sortable>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name">
              {(rowData) => {
                return(
                  <p>        
                    <MuiTypography style={{marginTop:"10px"}}  onDoubleClick={() => { onHandleRename(rowData.id, rowData.name , rowData.type)}} onClick={() => {rowData.type=== "folder" && setTimeout(() => onHandleFolderPath(rowData.id, rowData.name),300)}}>
                     {rowData.name}
                  </MuiTypography>
                  </p>
                )
              }}
            </Cell>
          </Column>

          <Column width={100} align="center" sortable>
            <HeaderCell>Type</HeaderCell>
            <Cell dataKey="name">
              {(rowData) => {
                return(
                  <p>        
                    <MuiTypography style={{marginTop:"10px"}}  onDoubleClick={() => { onHandleRename(rowData.id, rowData.name , rowData.type)}} onClick={() => {rowData.type=== "folder" && setTimeout(() => onHandleFolderPath(rowData.id, rowData.name),300)}}>
                     {findItemType(rowData.name)}
                  </MuiTypography>
                  </p>
                )
              }}
            </Cell>
          </Column>

          <Column width={100} align="center" sortable >
            <HeaderCell>Size</HeaderCell>
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

          <Column width={100} align="center" sortable>
            <HeaderCell>Creacted on</HeaderCell>
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

          <Column width={200} align="center" >
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {(rowData) => {

                return (
                  <div style={{marginTop:"-5px"}}>
                  <Actions />
                   {/* deleteSelected={() => deleteItem(rowData.id)} downloadSelected = {() => downloadItem(rowData.type,rowData.link)}/> */}
                </div>
                );
              }}
            </Cell>
          </Column>
        </Table>

    
    </div>

</div>
  )
      };

export default DataForm;
