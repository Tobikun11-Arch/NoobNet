import './Customize Css/Model.css';
import './Customize Css/Registration.css';
import IconFacebookCircled from './Svg Icons/IconFacebookCircled.tsx';
import Icon393Google from './Svg Icons/Icon393Google.tsx';
import IconTwitterFill from './Svg Icons/IconTwitterFill.tsx';
import React, { FormEvent, MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as storageReference, getStorage,  getDownloadURL } from "firebase/storage";

interface User {

  Username: string;
  FullName: string;
  Email: string;
  Password: string;

}

export default function HomePage() {

    const History = useNavigate();
    const[showNotification, setNotification] = useState(false);
    const back = async () => {

        History('/');

    }

    const [isClick, setHide] = useState(false);

    const Clicked = (e: FormEvent<HTMLElement>) => {

        e.preventDefault();
        setHide((prevState) => !prevState);

    }


    //Registration

    const db = getFirestore ();

    const[inputvalue1, setValue1] = useState('');
    const[inputvalue2, setValue2] = useState('');
    const[inputvalue3, setValue3] = useState('');
    const[inputvalue4, setValue4] = useState('');
    const[AgreementChecked, setAgreement] = useState(false);

    let used = false;

    const auth = getAuth();

    const Registered = async () => {

        if (inputvalue1.trim() === '' ||
            inputvalue2.trim() === '' ||  
            inputvalue3.trim() === '' || 
            inputvalue4.trim() === '' 

          ) {

            window.alert(`Please fill all fields`);
            return;

          }

          if(!AgreementChecked) {

            window.alert(`Please agree to the terms and conditions.`);
            return;

          }

            try {
                await createUserWithEmailAndPassword(auth, inputvalue3, inputvalue4);
                setNotification(true);
              }
              

              
              catch (error) {
                 
                window.alert(`Email already in use`);
                setNotification(false);
                used = true;

              }
              
            if(!used) {


                try {
            
                    const dofref = await addDoc(collection(db, "userAccounts"), {
        
                        Username: inputvalue1,
                        FullName: inputvalue2,
                        Email: inputvalue3,
                        Password: inputvalue4
            
                    });
                
                }

                catch (error) {
            
                    console.error(Error);
        
                  }

                 

            }
          
          

    }

    //End Registration



    //Login Form Function

    const[LoginEmail, setLoginEmail] = useState('');
    const[LoginPassword, setLoginPassword] = useState('');
    
    const HandleLogin = async() => {

        const q = query(collection(db, "userAccounts"),
    
        where('Email', '==', LoginEmail),
        where('Password', '==', LoginPassword)

    );

    const querySnap = await getDocs(q);
    const storage = getStorage();

    if (!querySnap.empty) {
        const userData = querySnap.docs.map((doc) => doc.data());
  
        try {
          const fileName = `${userData[0].FullName}-profile-picture.jpg`;
          const storageRef = storageReference(storage, `profile_pictures/${fileName}`);
          await getDownloadURL(storageRef);
          History('/Loader', { state: { user: userData[0] } });
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            History('/User', { state: { user: userData[0] } });
          } else {
            console.error('Error checking profile picture:', error);
          }
        }
      } else {
        window.alert(`Incorrect Email or Password`);
      }
    };


    return(

        <>
        
        <div className="Main">
        
        <div className="Greet">
        <h1 id='LoginGreet'>{isClick ? "Register" : "Login"}</h1>
        <h4>{isClick ? "Please register to continue" : "Please login to continue"}</h4>
        </div>

        <div className="Box" style={{display: isClick ? "none" : "block" }}>
        

        <div className="UserDetails">

        <label htmlFor="Email" id='EmailLabel'>Email Address</label>
        <input type="text" id='Email' placeholder='yourgmail@gmail.com' value={LoginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>

        <label htmlFor="Password" id='PasswordLabel'>Password</label>
        <input type="Password" id='Password' placeholder='*****************' value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>

        </div>

        <div className="ForgotPassword">

        <div className="CheckBox">
        <input type="checkbox" /> 
        <p id='Remember'>Remember me</p>
        </div>

        <a href="" className='ForgotPass'>Forgot Password?</a>

        </div>

        <div className="LoginNow">

        <button id='LoginButton' onClick={HandleLogin}>Login</button>

        <p id='or'>or</p>

        <div className="SocialMedia">
       <a href=""> <IconFacebookCircled /></a>
       <a href=""> <Icon393Google /></a>
       <a href=""> <IconTwitterFill /></a>
       </div>

        <div className="Register">
       <p>Don't have an Account? <a href="" onClick={Clicked}>Sign up</a></p>
       </div>
       </div>

        </div> {/*end of Box 1 */}


        {/**Box 2 Area */}

        <div className="Box2" style={{display: isClick ? "block" : "none" }}>


        <div className="Choice">

            <a href="" id='Signup'>Sign up</a>
            <a href="" id='Signin'>Sign in</a>

        </div>

        <div className="userDetails">

        <input type="text" placeholder='Username' value={inputvalue1} onChange={(e) => setValue1(e.target.value)} />
        <input type="text" placeholder='Full Name'  value={inputvalue2} onChange={(e) => setValue2(e.target.value)}/>
        <input type="email" placeholder='Email' value={inputvalue3} onChange={(e) => setValue3(e.target.value)}/>
        <input type="Password" placeholder='Password'  value={inputvalue4} onChange={(e) => setValue4(e.target.value)}/>

        </div> {/**userDetails End */}

        <div className="Agreement">
        
        <input type="checkbox" checked={AgreementChecked} onChange={(e) => setAgreement(e.target.checked)}/>
        <div className="terms">
        <p id='AgreeP'>Agree with</p> <a href="">Terms & Conditions</a>
        </div>
        </div>
        
        <div className="Reg">
        <button id='RegisterButton' onClick={Registered}>Register</button>
        <p id='or'>or Sign up with</p>

        <div className="SocialMedia">
       <a href=""> <IconFacebookCircled /></a>
       <a href=""> <Icon393Google /></a>
       <a href=""> <IconTwitterFill /></a>
       </div>
        </div>

        {showNotification && (
        <div className="Notification">

        <p>Congratulations! Your account has been successfully created.
        </p>

        <button onClick={() => setNotification(false)}><a href="">ok</a></button>

        </div>
        )}

        </div> {/*end of Box 2 */}
        </div>  {/*end of Main Container */}           
            
        </>

    );

};