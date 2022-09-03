import React, { useState } from "react";
function Metamask(){
  const [address,setAddress]=useState(null);

    async function RequestAccounts()
  {
    if(window.ethereum && window.ethereum.isMetaMask)
    {
       const accounts = await window.ethereum.request({
        method:"eth_requestAccounts",
      });
      setAddress(accounts);
      console.log(accounts);
    }

  };
    return(
    <>
    <button onClick={RequestAccounts}>
        Connect to Wattet
    </button>
    {address && <p>Connect to Wallet : {address}</p>}
    </>
    );
}

export default Metamask;