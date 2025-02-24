import React, { useState, useEffect } from "react";
import './Customize Css/userInfo.css';
import IconPencilSquare from './Svg Icons/IconPencilSquare.tsx';
import { useNavigate, useLocation } from "react-router-dom";
import { getStorage, ref as storageReference, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from "firebase/app";

function UserPage() {
  const [ImageValue, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(true);

   const Location = useLocation();
   const { user } = Location.state;
   const navigate = useNavigate();


  const app = getApp();
  const storage = getStorage(app);

  const HandleImage = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const urlImage  = URL.createObjectURL(e.target.files[0]);
      const file = e.target.files[0];
      setImage(urlImage );

      setIsLoading(true);
      const fileName = `${user.FullName}-profile-picture.jpg`;
      const storageRef = storageReference(storage, `profile_pictures/${fileName}`);
      await uploadBytes(storageRef, file);

      const profilePictureUrl = await getDownloadURL(storageRef);
      setImage(profilePictureUrl);

      setIsLoading(false);
      navigate('/Loader', {state: { user, ImageValue : profilePictureUrl } });
    }
  };



  return (
    <>
      {/* <h1>{user.FullName}</h1> //This is how u call user from another page */}

      {showMainContainer && (
      <div className="MainCointainer">
        <div
          className="profileBox1"
          style={{
            backgroundImage: ImageValue ? `url(${ImageValue})` : 'block',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} 
        >

          <div className="Pencilsvg" onClick={() => document.getElementById('Image')?.click()}>
            <IconPencilSquare />
          </div>
        </div>
        {/**Profile closed */}

        <input id="Image" type="file" onChange={HandleImage} style={{ display: 'none' }} />

        <p>Set up your profile now!</p>
        

      </div>)};
      {/*Main cointainer closed */}
    </>
  );
}

export default UserPage;
