import { getFirestore, addDoc, collection, getDocs, DocumentData} from "firebase/firestore"; 
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface State {

    field1: string;
    field2: string;

}

export default function Main() {

    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    let [storedValues, setValues] = useState<State[]>([]);
  
    const db = getFirestore();
  
    const saveDataToFirestore = async () => {
        const docRef = await addDoc(collection(db, "myCollection"), {
          field1: inputValue1,
          field2: inputValue2,
        });
        alert("Document written to Database");
    };

    

    const RetrieveData = async () => {

        const docssy = await getDocs(collection(db, "myCollection"));

        const temporr: State[] = [];

        docssy.forEach((doc) => {

            const data: State = doc.data() as State;
            temporr.push(data);

        });

        setValues(temporr);

    };

    const history = useNavigate();

    const change = async () => {

      history('2ndPage');

    }
  
    return (
        <>
      <div className="App">
        <h1>Save Data to Firebase Firestore</h1>
        <input
          type="text"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
        />
        <input
          type="text"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
        />
        <button onClick={saveDataToFirestore}>Save to Firestore</button>
      </div>

      <button onClick={RetrieveData}>Retrieve</button>

      <h2>Retrieved Data:</h2>
      <ul>
        {storedValues.map((value, index) => (
          <li key={index}>{`Field1: ${value.field1}, Field2: ${value.field2}`}</li>
        ))}
      </ul>

      <button onClick={change}>Home Page</button>

      </>
    );

};