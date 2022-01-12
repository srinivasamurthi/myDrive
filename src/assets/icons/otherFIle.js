import MuiSvgIcon from '@material-ui/core/SvgIcon';
import React from "react";

function OtherFIle(props) {
  return (
    <MuiSvgIcon  {...props}>
<path d="M29.8332 0.833496H6.49984C4.95274 0.833496 3.46901 1.44808 2.37505 2.54204C1.28109 3.636 0.666504 5.11973 0.666504 6.66683V53.3335C0.666504 54.8806 1.28109 56.3643 2.37505 57.4583C3.46901 58.5522 4.95274 59.1668 6.49984 59.1668H41.4998C43.0469 59.1668 44.5307 58.5522 45.6246 57.4583C46.7186 56.3643 47.3332 54.8806 47.3332 53.3335V18.3335L29.8332 0.833496ZM41.4998 53.3335H6.49984V6.66683H26.9165V21.2502H41.4998V53.3335Z" fill="#AFAFAF"/>    </MuiSvgIcon>
  );
}

export default function OtherFIleIcon() {

  return (
      <OtherFIle viewBox="0 0 48 60"  style={{fontSize:"25px"}}/>
  );
}

