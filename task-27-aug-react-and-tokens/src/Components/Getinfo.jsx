import React,{useState} from 'react';
import {ethers} from "ethers";
import Furyabi from '../qasim-abi.json';
import Web3 from 'web3';

function Getinfo() {
  const contractAddress="0xc430f3ac51334c7a5320d74754ba27b9bd856466";
  const web3 = new Web3(Web3.givenProvider);
  const contractInstance = new web3.eth.Contract(Furyabi, contractAddress);
  const [address, getaddress] = useState("");
  const [Name,setName]=useState(null);
  const [Symbol,setSymbol]=useState(null);
  const [Supply,setSupply]=useState(null);

const handleSubmit = async()=>{
  const response = await contractInstance.methods.name().call();
  console.log("Token Name is ", response);
  const  syresponse = await contractInstance.methods.symbol().call();
  console.log("Token Symbol is ", syresponse);
  const supply=await contractInstance.methods.totalSupply().call();
  console.log("The tokken total supply is : ",supply);

  setName(response);
  setSymbol(syresponse);
  setSupply(supply);
}
  return (
        <div className="Balance">
   
            <button
            onClick={
                handleSubmit
            }
            >Get wallet info</button>

            <h3>
              {Name && <p><i>Token name is : </i> <b className="contract-info"><u>{Name}</u></b></p>}
            </h3>
            <h3>
            {Symbol && <p><i>Token name is : </i> <b className="contract-info"><u>{Symbol}</u></b></p>}
            </h3>
            <h3>
            {Supply && <p><i>Token name is : </i> <b className="contract-info"><u>{Supply}</u></b></p>}
            </h3>
    </div>
  );
}

export default Getinfo;
