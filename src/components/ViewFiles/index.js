import React, { useEffect } from "react";
import {useState} from 'react';

import axios from "../../axiosInterceptor";

import {connect} from "react-redux";

import FileViewer from 'react-file-viewer-extended';

const ViewFiles = (props) => {
  console.log(props.item)
  

  const isGoogle = props.item.metadata.drive;
  const isGoogleDoc = props.item.metadata.googleDoc;
  const isPersonal = props.item.metadata.personalFile;  

  const url = isGoogle ? `/file-service-google/full-thumbnail/${props.item._id}` 
        : !isPersonal ? `/file-service/full-thumbnail/${props.item._id}` : `/file-service-personal/full-thumbnail/${props.item._id}`;
        
      const config = {
          responseType: 'arraybuffer'
      };

const [fileUrl, setFileUrl] = useState();
const [fileType, setFileType] = useState();

useEffect(() => {
  axios.get(url, config).then((response) => {

    const file = new Blob([response.data]);
    const fileURL = URL.createObjectURL(file);
    console.log("fileUrl", fileUrl)
    setFileUrl(fileURL)
  })

  const filenameSplit = props.item.filename.split(".");

        if (filenameSplit.length > 1) {
            const extension = filenameSplit[filenameSplit.length - 1]
            if(extension === "jpg")
              setFileType("jpeg")
            else
             setFileType(extension.toLowerCase());
        }
}, []);
        
      const onError = () => {
        logger.logError(e, 'error in file-viewer');
      }

      const CustomErrorComponent = () => {
        return(
          <div></div>
        )
      }

        console.log("fileUrl", fileUrl)

        console.log("fileType", fileType)
  return(
      <div>
        {
          fileType=== "jpeg" || fileType === "png"
          ?
            <img className="photoviewer__image" src={fileUrl}/>
          :
          <div style={{heigth:"100px"}}>
          <FileViewer
          fileType={fileType}
          filePath={url}
          errorComponent={CustomErrorComponent}
          errorComponent = {CustomErrorComponent}
          onError={onError}/>
          </div>
        }
      
      {/* <img className="photoviewer__image" src={fileUrl}/> */}
   


</div>
  )
      };

      const connectStateToProp = (state) => ({
        photoID: state.photoViewer.id,
        isGoogle: state.photoViewer.isGoogle,
        isPersonal: state.photoViewer.isPersonal,
    })

export default connect(connectStateToProp)(ViewFiles);
