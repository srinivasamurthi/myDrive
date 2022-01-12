import MuiSvgIcon from '@material-ui/core/SvgIcon';
import React from "react";

function Folder(props) {
  return (
    <MuiSvgIcon  {...props}>
<path d="M7.33329 0.333252H2.33329C1.40829 0.333252 0.666626 1.07492 0.666626 1.99992V11.9999C0.666626 12.4419 0.842221 12.8659 1.15478 13.1784C1.46734 13.491 1.89127 13.6666 2.33329 13.6666H15.6666C16.1087 13.6666 16.5326 13.491 16.8451 13.1784C17.1577 12.8659 17.3333 12.4419 17.3333 11.9999V3.66658C17.3333 2.74159 16.5833 1.99992 15.6666 1.99992H8.99996L7.33329 0.333252Z" fill="#AFAFAF"/>
    </MuiSvgIcon>
  );
}

export default function FolderIcon() {

  return (
      <Folder viewBox="0 0 61 90" style={{fontSize:"110px"}}/>
  );
}