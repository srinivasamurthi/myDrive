import React from "react";
import {connect} from "react-redux";

const FolderTreeStorageFile = (props) => {

    return(
        <div className="folder-tree-sub__storage">
        <div className="folder-tree-sub__storage__box">
        <div className="folder-tree-sub__storage__image-div">
                       
                    </div>
                    <div className="folder-tree-sub__icon-wrapper">
                      
                    </div>
            <div className="folder-tree-sub__storage__text-div">
                <p onClick={() => props.openFile(props.file)} className="folder-tree-sub__storage__text">{props.file.filename}</p>
            </div>
        </div>
</div>
    )
}

// mapStateToProp = (state) => ({
//     selectedFile : state.viewFileContent.viewContent,
// })

export default FolderTreeStorageFile;