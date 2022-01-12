import Header from ".././Header";
import LeftSection from ".././LeftSection"
import MainSection from ".././MainSection";
import Uploader from ".././Uploader";
import React from "react";
import PhotoViewer from "../PhotoViewer"
import ShareModel from "../ShareModel";
import UploadOverlay from "../UploadOverlay";
import HomepageSpinner from "../HomepageSpinner";
import MobileContextMenuContainer from "../MobileContextMenu";
import ShareModelWrapper from "../ShareModelWrapper";

const HomePage = (props) => (

    <div>

        <HomepageSpinner />

        <div className="main-wrapper" style={{backgroundColor: "#808080"}}>
            <Header goHome={props.goHome}/>
            <div className="main__wrapper--container" style={{backgroundColor: "#808080"}} >

                {/* <LeftSection goHome={props.goHome}/> */}
                {/* <MainSection />            */}
                <Uploader />         
                {props.photoID.length === 0 ? undefined :
                <PhotoViewer />}
                
            </div>
        </div>

        <UploadOverlay />
        {/* <ShareModel /> */}
        <ShareModelWrapper />
        <MobileContextMenuContainer />

    </div>
    

)

export default HomePage

