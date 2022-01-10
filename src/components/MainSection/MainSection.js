import DataForm from ".././Dataform";
import RightSection from ".././RightSection";
import MoverMenu from ".././MoverMenu";
import PopupWindow from '.././PopupWindow'
import React from "react";

import GridView from "../GridView"

import {connect} from "react-redux";

import ViewFiles from "../ViewFiles";
import Properties from "../Properties";

const MainSection = React.forwardRef((props, ref) => {

    const viewMode = () => {
        
        switch( props.viewType){
            case "list" :
                return (
                    <DataForm
                    folderClick={props.folderClick}
                    fileClick={props.fileClick}
                    downloadFile={props.downloadFile}/> 
                )

            case "grid" :
                return(
                <GridView 
             folderClick={props.folderClick}
        fileClick={props.fileClick}
        downloadFile={props.downloadFile}
        />
                )
        
        case "properties" :
            return(
                <Properties/>
            )
        default: 
        return null
        
            }
        
    }

    return (

        <div class="content__block" style={{backgroundColor:"#808080"}}>
                <div className="overlay" style={{backgroundColor:"#808080"}} style={(props.leftSectionMode === "open" || props.rightSectionMode === "open") ? {display:"block"} : {display:"none"}}>
        </div>
				{/* <div class="small__switcher--content">
					<a onClick={props.switchLeftSectionMode} class="menu__button"><i class="fas fa-bars"></i></a>
					<a onClick={props.switchRightSectionMode} class="image__viewer"><i class="fas fa-images"></i></a>
				</div> */}
				<div class="file__container" backgroundColor="#808080" style={props.routeType === "search" ? {flexDirection: "column"} : {flexDirection:"row"}}>

					{true ? undefined : <div class="file__control--panel empty__control--panel">
						<div class="file__get--started">
							<div class="get__started--image">
								<img src="/assets/get_startedfile.svg" alt="get"/>
							</div>
							<h6>All your files in one place</h6>
							<p>Drag and drop a file to get started</p>
						</div>
					</div>}

                    {props.routeType === "search" ? 
                    <div class="file__control--panel folder__view" style={{paddingBottom:"0", marginBottom:"-50px"}}>
                        <div class="results__files">
                        <h2><span class="counter__result">{props.files.length + props.folders.length >= 50 ? "50+" : props.files.length + props.folders.length}</span> <span class="result__word">results</span> for <span class="result__search--word">{props.cachedSearch}</span></h2>
                        <p class="searching__result">You are searching in <span class="root__parent">{props.parent === "/" ? "Home" : props.parentNameList.length !== 0 ? props.parentNameList[props.parentNameList.length - 1] : "Unknown"}</span> <span class="spacer"><img style={{height:"11px", marginTop:"2px", display:"none"}} src="/assets/smallspacer.svg" alt="spacer"/></span><span class="current__folder"></span> <a href="#" style={{display:"none"}} class='search__filter--global'>Show results from everywhere</a></p>
						</div>
                    </div> : undefined}

                    {props.showPopup ? <PopupWindow downloadFile={props.downloadFile} /> : undefined}
                    
                    {/* {props.moverID.length === 0 ? undefined :
                    <MoverMenu />
                    } */}

{
           props.fileOpenBoolean ?
        <div  style={{width:"1250px", height:"800px", backgroundColor:"#808080"}}>

          <div style={{height:"800px", width:"1300px", backgroundColor:"#808080" }}>
             <ViewFiles item={props.viewContent}/>
            </div>
          </div>
          :
         viewMode()

 }

                        <RightSection  
                        folderClick={props.folderClick}
                        fileClick={props.fileClick}
                        downloadFile={props.downloadFile}
                        /> 
                               
				</div>
		</div>

)

})


const mapStateToProp = (state) => ({
        viewContent : state.viewFileContent.viewContent,
        modalOpenBoolean : state.viewFileContent.modalOpenBoolean,
        fileOpenBoolean : state.viewFileContent.fileOpenBoolean,
        viewType : state.viewMode.viewType,
    })

export default connect(mapStateToProp) (MainSection);