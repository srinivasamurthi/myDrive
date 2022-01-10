
import {connect} from "react-redux";
import React from "react";

import RightSectionContent from "./RightSectionContent";
import { Typography } from "@material-ui/core";

const RightSectionContainer = (props) => {

    return(
        <div>
            {
            props.selected.length === 1 
            ? <div style={{width:"250px",display:"flex", marginTop:"80px",backgroundColor:"#808080"}}>
            <RightSectionContent selectedItemId ={props.selected[0]} />
            </div>

            :
            <div class= "file__details empty__details" style={{backgroundColor:"#808080"}}>
            <div class="file__details--inner" >
                    <span><img src="/assets/filedetailsicon.svg" alt="filedetailsicon"/></span>
                    <Typography style={{color:"white"}}>
                        Select a file or folder to  view it’s details
                    </Typography>
                    <p></p>
            </div>
                </div>
            }
        </div>
    )
}

const connectPropToState = (state) => ({
    files: state.files,
    folders: state.folders,
    selected: state.selectedItem.selected,
})

export default connect(connectPropToState)(RightSectionContainer);