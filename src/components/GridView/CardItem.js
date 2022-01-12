import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';

import Grid from "@material-ui/core/Grid"
import ImageFileIcon from '../../assets/icons/imageFile';
import PdfFileIcon from "../../assets/icons/pdfFile";
import PptFileIcon from "../../assets/icons/pptFile";
import OtherFIleIcon from '../../assets/icons/otherFIle';
import FolderIcon from "../../assets/icons/folder";

import MuiMoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

const CardItem = (props) => {
    
    const icon = (type) => {
       switch (type){
           case "JPG" : 
            return <ImageFileIcon/>
            case "PDF":
                return <PdfFileIcon/>
            case "PPT" :
                return <PptFileIcon/>
            case "Folder" :
                return <FolderIcon/>
            default :
                return <OtherFIleIcon/>
       }
    }

  return(
    <Card style={{width:"75%"}} onDoubleClick={() => props.onHandleDoubleClick(props.file)} onClick={() => props.onHandleClick(props.file._id)}>
    <CardActionArea>
        <CardMedia style={{height:"190px",background:"#e1e2e3"}}>
            
        </CardMedia>

          <Grid container direction="column">
                <Grid item container spacing={2}>
                <Grid item xs={2} style={{marginTop:"10px", marginBottom:"-90px"}}>
                        {icon(props.file.type)}
                    </Grid>
                    <Grid item xs={7} style={{height:"50px",overflowY: "hidden",overflowX:"hidden",}}>
                        <Typography gutterBottom variant="h6" style={{marginTop:"5px"}}>
                            {props.file.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{marginTop:"10px"}}>
                        <MuiMoreVertOutlinedIcon/>
                    </Grid>
                </Grid>


                <Grid item container spacing={1}>
                <Grid item xs={2}></Grid>

                    <Grid item xs={3}>
                        <Typography gutterBottom variant="subtitle1">
                            {props.file.size}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>

                    <Grid item xs={5}>
                        <Typography gutterBottom variant="subtitle1">
                            {props.file.date}
                        </Typography>
                    </Grid>
                </Grid>

          </Grid>
    </CardActionArea>
  </Card>
  )
      };


export default CardItem;
