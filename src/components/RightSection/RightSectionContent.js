
import {connect} from "react-redux";
import React from "react";

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiTypography from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';

import axios from "../../axiosInterceptor"
import {useState} from "react";

import moment from "moment";

const RightSectionContent = (props) => {

    const fileData = props.files.find(item => item._id === props.selectedItemId);

    const folderData = props.folders.find(item => item._id === props.selectedItemId);



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
    console.log("size", size)
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
    return `${size} B`
  }

  const folderSize = () =>{
    const parent = folderData._id;
    const url1 = folderData.type === "drive" ? `/file-service-google/list?parent=${parent}` 
    : `/file-service/list?parent=${parent}&type=${folderData.type}`; 

   let fileList;
    axios.get(url1).then((response) => {
      fileList = response.data
      const childFileSize = Object.keys(fileList).reduce((previous, key) => Number(previous) + Number(fileList[key].metadata.size), Number(0));
      console.log("childFileSize", childFileSize)
      setSize(childFileSize);
    })
    }

    const [size, setSize] = useState(fileData ? fileData.metadata.size : 0)

    if(folderData){
      folderSize();
    }

  const timeString = (date) => {

    const now = moment(Date());
        const then = moment(date)
        const time = now.diff(then,"seconds")
    
    if(time < 60)
    return("Just Now")
else{
    let changeTimeMunite = ~~(time/60);
    if(changeTimeMunite < 60)
        return(`${changeTimeMunite} minutes ago`)
    else{
        let changeTimeHours = Math.round(changeTimeMunite/60);
        if ( changeTimeHours < 24)
            return(`${changeTimeHours} Hours ago`);
        else{
            let changeTimeDays = Math.round(changeTimeHours/24);
            return(`${changeTimeDays} Days ago`);
        }
    }
} 
}

    return(
        <div style={{marginLeft:"10px", marginTop:"20px"}}>
      <MuiAccordion style={{width:"98%"}}>
        <MuiAccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MuiTypography>File Preview</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiGrid container>
              <MuiGrid item container>
          <MuiGrid item xs={5}>
          <MuiTypography>File Name :</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={2}></MuiGrid>
        <MuiGrid item xs={5}>
            <MuiTypography>{fileData? fileData.filename : folderData.name}</MuiTypography>
        </MuiGrid>
        </MuiGrid>

        <MuiGrid item container>
          <MuiGrid item xs={5}>
          <MuiTypography>Type :</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={2}></MuiGrid>
        <MuiGrid item xs={5}>
            <MuiTypography>{fileData ? findItemType(fileData.filename) : "Folder"}</MuiTypography>
        </MuiGrid>
        </MuiGrid>
        <MuiGrid item container>
          <MuiGrid item xs={5}>
          <MuiTypography>Size :</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={2}></MuiGrid>
        <MuiGrid item xs={5}>
            <MuiTypography>{fileSize(size)}</MuiTypography>
        </MuiGrid>
        </MuiGrid>

        <MuiGrid item container>
          <MuiGrid item xs={5}>
          <MuiTypography>Created :</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={2}></MuiGrid>
        <MuiGrid item xs={5}>
            <MuiTypography>{timeString(fileData ? fileData.uploadDate : folderData.createdAt)}</MuiTypography>
        </MuiGrid>
        </MuiGrid>

        <MuiGrid item container>
          <MuiGrid item xs={5}>
          <MuiTypography>Location :</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={2}></MuiGrid>
        <MuiGrid item xs={5}>
            <MuiTypography>Local</MuiTypography>
        </MuiGrid>
        </MuiGrid>
          </MuiGrid>
        </MuiAccordionDetails>
      </MuiAccordion>
      <MuiAccordion style={{width:"98%"}}>
        <MuiAccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography>Tags</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography>
            - Not Available -
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>
      <MuiAccordion style={{width:"98%"}}>
        <MuiAccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography>Comments</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography>
            - Not Available -
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>
      <MuiAccordion style={{width:"98%"}}>
        <MuiAccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography>Access</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography>
           - Not Available -
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>
      <MuiAccordion style={{width:"98%"}}>
        <MuiAccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography>Share Info</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography>
            - Not Available -
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
    )
}

const connectPropToState = (state) => ({
    files: state.files,
    folders: state.folders,
})
export default connect(connectPropToState)(RightSectionContent);