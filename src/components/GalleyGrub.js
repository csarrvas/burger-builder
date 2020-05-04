import React from 'react';
import './css/galleyGrub.css';
import clientAxios from '../config/axios';
import { printMessage } from '../helpers/ui';

const updateJsonFile = async (data) => {
  try {
    const response = await clientAxios.get('/hamburgers');
    response.data.forEach(hamburger => {
      clientAxios.delete(`/hamburgers/${hamburger.id}`);
    });
    
    data.forEach(hamburger => {
      clientAxios.post('/hamburgers', hamburger);
    });

    printMessage('Galley Grub Updated with your hamburgers', 'success', '#upload');

  } catch(error) {
    printMessage('You have to run json-server db.json --port 4000', 'error', '#upload');
  }
}

const GalleyGrub = ({ ls }) => {
  const data = ls.getAllBurgers();
  return (
    <div id="upload">
      <button onClick={() => updateJsonFile(data)}>Upload to Galley Grub</button>
    </div>
  );
}
 
export default GalleyGrub;