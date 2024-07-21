import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './firebaseConfig.js'; // Add this line prevent firebase not loading error
import HomePage from './Components/HomePage.tsx';
import 'bootstrap/dist/css/bootstrap.css'
import UserPage from './Components/UserPage.tsx';
import './firebaseConfig.js';
import UserHome from './Components/UserHome..tsx'
import Loader from './Components/Loading.tsx' 

function App() {
 
  return(

    <>

      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<HomePage />} />
          <Route path='/User' element={<UserPage />} />
          <Route path='/userHome' element={<UserHome />} />
          <Route path='/Loader' element={<Loader />} />

        </Routes>
      </BrowserRouter>
    
    </>

  );

}

export default App;
