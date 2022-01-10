import FolderTree from ".././FolderTree";
import React from "react";
import UploadStorageSwitcher from "../UploadStorageSwitcher";
import mobilecheck from "../../utils/mobileCheck";
import { Drawer } from "@material-ui/core";


class LeftSection extends React.Component {

    constructor(props) {
        super(props);

        this.isMobile = mobilecheck();
        this.nonDropMode = window.localStorage.getItem('non_drop-mode');
       
    }

    render() {

        return (

           <div className="menu__block" backgroundColor="gray" ref={this.props.leftSectionRef} style={this.props.leftSectionMode === '' ? {} : this.props.leftSectionMode === 'open' ? {left: "0px"} : {left:"-290px"}}>
                <div class="navigation__block"style={{ backgroundColor: "#808080" }}>
					<div class="folder__structure" style={{ backgroundColor: "#808080" }}>
      
            <FolderTree style={{backgroundColor:"#808080"}}/>
      
						
		 			</div>
		 		</div>

            </div>
        )
    }
}

export default LeftSection;
