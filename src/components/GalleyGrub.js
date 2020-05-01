import React from 'react';
import './css/galleyGrub.css';

const sendToJsonFile = (data) => {
  // console.log(data);
  // this function has to send the 'data' to a .json file
}

const GalleyGrub = ({ ls }) => {
  const data = JSON.stringify(ls.getAllBurgers());
  return (
    <div id="upload">
      <button onClick={() => sendToJsonFile(data)}>Upload to Galley Grub</button>
    </div>
  );
}
 
export default GalleyGrub;