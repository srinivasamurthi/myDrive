import React from "react";
import FolderTreeStorageSub from ".././FolderTreeStorageSub";
import FolderTreeStorageFile from "../FolderTreeStroageFile";
import MuiTypography from "@material-ui/core/Typography"

import {setViewContent} from "../../actions/viewFileContent";
import { connect } from "react-redux";

const FolderTreeStorage = (props) => {
    
    

    const handleOpenFile = (file) => {

        console.log("dsas", file)

        const filenameSplit = file.filename.split(".");

        let fileType;
        if (filenameSplit.length > 1) {
            const extension = filenameSplit[filenameSplit.length - 1]
            fileType = extension.toUpperCase();
        }

        console.log("fileTYYP", fileType)

        if(fileType === "JPG" || fileType === "PDF" || fileType === "DOC" || fileType === "DOCX" || fileType === "PNG"){
            props.dispatch(setViewContent(file,true))       
           }
     
           else{
             props.dispatch(setViewContent(file,false))
           }
    }

    return(

    <div className="folder-tree__storage">
                <div className="folder-tree__storage__box">
                    <div className="folder-tree__storage__image-div">
                        <img onClick={props.arrowClick} className="folder-tree__storage__image" src={(props.state.open && props.state.folders.length !== 0) ? "/images/menu-down.svg" : "/images/menu-right.svg"}/>
                    </div>
                    <div className="folder-tree__storage__text-div">
                        <p className="folder-tree__storage__text">{props.type === "drive" ? "Google Drive" : props.type === "mongo" ? "Vcollab Drive" : "Amazon S3"}</p>
                    </div>
                </div>

                <div className="folder-tree__storage-subview">
                    <div className="folder-tree__storage-subview-box">
                    {(props.state.open && props.state.files.length !== 0)  ? props.state.files.map((file) => {
                            return <FolderTreeStorageFile openFile={handleOpenFile} file={file} />
                        }) : undefined}
                        {(props.state.open && props.state.folders.length !== 0)  ? props.state.folders.map((folder) => {
                            return <FolderTreeStorageSub folder={folder} type={props.type}/>
                        }) : undefined}
                    </div>
                </div>
    </div>
                        //return

    // <div class="elem__structure root__element">
    //     <div class={props.state.open ? "parent__structure active__parent" : "parent__structure"}>
    //         <span onClick={props.arrowClick}><img src="/assets/arrowstructure.svg" alt="arrowstructure"/></span>
    //         <div class="info__name">
    //             <p>{props.type === "drive" ? "Google Drive" : props.type === "mongo" ? "myDrive" : "Amazon S3"}</p>
    //         </div>
    //     </div>
    //     {(props.state.open && props.state.folders.length !== 0)  ? props.state.folders.map((folder) => {
    //         return <FolderTreeStorageSub key={folder._id} folder={folder} type={props.type}/>
    //     }) : undefined}
    // </div>
) 

}

export default connect() (FolderTreeStorage);