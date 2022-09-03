import React, { useEffect, useState } from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search from "./Components/Search";
import Error from "./Components/Error";
import "h8k-components";
import axios from "axios";
import MetaMask from "./Components/Metamask";

const title = "PERN Stack Demo";
function App() {
  const [error, setError] = useState({ status: false, message: "" });
  const [studentList, setStudents] = useState([]);
  const [studentsFromDb, setStudentsDb] = useState([]);
  const resetError = () => setError({ status: false, message: "" });

  const [address, setAddress] = useState(null);


  async function getUser() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
      setStudentsDb(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //All Things related to component did mount
    if(studentsFromDb.length > 0) return;
    getUser();
  }, []); // Component Did Mount

  useEffect(() => {
    if(studentList.length < 1) return;
    console.table(studentList);
  }, [studentList])

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <MetaMask address={address} setAddress={setAddress} />
        <hr />        
        <Search
          error={error}
          setError={setError}
          resetError={resetError}
          setStudents={setStudents}
          studentList={studentList}
          studentsFromDb={studentsFromDb}
        />
        <Error error={error} setError={setError}/>
        <ResidentsList
          error={error}
          setError={setError}
          studentList={studentList}
        />
      </div>
    </div>
  );
}

export default App;
