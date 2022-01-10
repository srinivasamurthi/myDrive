import env from "../../enviroment/envFrontEnd";
import axios from "../../axiosInterceptor/index"
import React from "react";
import {connect} from "react-redux";
import {setInsertedFolderTreeID} from "../../actions/folderTree"
import FolderTreeStorage from "./FolderTreeStorage";

class FolderTreeStorageContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            folders: [],
            files:[],
            open: true,
        }

        this.updated = false;
        this.ignoreReset = false;
    }

    getFolders = () => {

        const parent = this.props.type === "drive" ? "root" : "/"; 
        
        const url = this.props.type === "drive" ? `/folder-service-google/list?parent=${parent}` 
        : `/folder-service/list?parent=${parent}&type=${this.props.type}`; 

        const url1 = this.props.type === "drive" ? `/file-service-google/list?parent=${parent}` 
        : `/file-service/list?parent=${parent}&type=${this.props.type}`; 

        axios.get(url).then((response) => {
            console.log("response.data", response.data)
            this.setState(() => {
                return {
                    folders: response.data,
                    open: true
                }
            }, () => {
                this.ignoreReset = false;
            })
        })

        axios.get(url1).then((response) => {
            console.log("response.data", response.data)
            this.setState(() => {
                return {
                    files: response.data,
                    open: true
                }
            }, () => {
                this.ignoreReset = false;
            })
        })

    }

    arrowClick = () => {

        if (this.state.open) {

            this.setState(() => {
                return {
                    folders: this.state.folders,
                    open: false,
                }
            })
        } else {
            this.getFolders()
        }
    }

    componentDidMount = () => {

        // const hideFolderTree = localStorage.getItem("hide-folder-tree");

        // if (hideFolderTree) {

        //     this.setState(() => ({
        //         hideFolderTree
        //     }))
            
        // } else {
        //     this.getFolders();
        // }

        this.getFolders();
    }

    // componentDidUpdate = () => {

    //     if (this.props.firstLoadDetails.status === "RESET" && !this.ignoreReset) {
    //         this.ignoreReset = true;
    //         this.getFolders();
    //         return;
    //     }
    
    //     if (this.updated) return;

    //     this.updated = true;

    //     if (this.props.firstLoadDetails === "root" || this.props.firstLoadDetails === "/" || !this.props.firstLoadDetails._id) return;

    //     if (this.props.firstLoadDetails.isGoogle) {
    //         if (this.props.type !== "drive") return;
    //     } else if (this.props.firstLoadDetails.isPersonal) {
    //         if (this.props.type !== "s3") return;
    //     } else {
    //         if (this.props.type !== "mongo") return;
    //     }

    //     const id = this.props.firstLoadDetails._id;

    //     const url = (this.props.type === "drive") 
    //     ? `/folder-service-google/subfolder-list-full?id=${id}` : `/folder-service/subfolder-list-full?id=${id}`

    //     axios.get(url).then((response) => {
    //         console.log("response.data1", response.data)
    //         if (response.data.length !== 0) {
    //             const id = response.data[0]._id;
    //             this.props.dispatch(setInsertedFolderTreeID(id, response.data))
    //         }
    //     })
    // }

    render() {

        // console.log("state.folder", this.state.folders)
        // console.log("state.files", this.state.files)

        return <FolderTreeStorage arrowClick={this.arrowClick} state={this.state} {...this.props}/>
    }
}

const connectStoreToProp = (state) => ({
    firstLoadDetails: state.folderTree.firstLoadDetails
})

export default connect(connectStoreToProp)(FolderTreeStorageContainer)