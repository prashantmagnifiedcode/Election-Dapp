import React, {useState } from "react";
import electionbi from './contracts/Election.json'

import Web3 from "web3";
import './election.css'

const App = () => {
  
  const openwallet=()=> {
      load()
      loadblockchain()
    }
    setInterval(() => {
      setremove(false)
      
    },5000);
    
    const[remove,setremove]=useState(true)
      const[account,setaccount]=useState(' ')

      const [loading, setloading] = useState(false);
      const [tran_loading, settran_loading] = useState(false);
      const[election,setelection]=useState()
      const[condidates1,setcondidates1]=useState('')
      const[condidates2,setcondidates2]=useState('')
      const[trans_detail_data,settrans_detail_data]=useState({
        blockHash:'',cumulativeGasUsed:'',from:' ',gasUsed:'',to :' ',
        transactionHash:''
      })

      const load=async()=>{
        
        if(window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          setloading(true)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      
    }
    else {
      window.alert('non Ethereum browser detected. Dowload Metamask')
    }
  
    }
     const loadblockchain=async()=>{
       
      const web3 = window.web3
      //load accounts
      const accounts = await web3.eth.getAccounts()
      setaccount(accounts)
      openwallet()
      //console.log(accounts)
      //load contract
      const networkId = await web3.eth.net.getId()
      const networkData = electionbi.networks[networkId]
      // console.log("netwrok",networkData)
      //  console.log(electionbi.abi)
        if(networkData){
          
const contract= new web3.eth.Contract(electionbi.abi,networkData.address);
const candidate1= await contract.methods.candidates(1).call()
 





const candidate2=await contract.methods.candidates(2).call()

 setcondidates1(candidate1)
 setcondidates2(candidate2)

setelection(contract)

setloading(false)

          
        }else{
          window.alert("not deploy");
        }
     } 
 
   const sub=async(i)=>{
     try{

       const val= await election.methods.vote(i).send({from:`${account}`})
       console.log("val",val.blockHash,val.cumulativeGasUsed,val.from,val.gasUsed,val.to ,val.transactionHash)
       settrans_detail_data({...trans_detail_data,blockHash:val.blockHash,cumulativeGasUsed:val.cumulativeGasUsed,from:val.from,
        gasUsed:val.gasUsed,to:val.to,transactionHash:val.transactionHash
        
      })
      settran_loading(true)
      openwallet()
      alert('Successfully Voted')
     }catch(e){alert('You have not Voted')}
   }
return(
    <>
<div class="container">
  { remove?<span className="coverbody">
    <h3>Welcome of India</h3>
  </span>
    
    :null}
 
   <div className="login">
     <h5 onClick={()=>openwallet()}>Login in Meta mask</h5>

  <p>User Account:{account}</p>

   </div>
  <h1>Election of India</h1>
 <div className="candidate">

  
  <div className="electioncss">
    <h1>BJP</h1>
    <election className="card">
      <img src="bjp.png" alt="" srcset="" />

    </election>
    
    <h1>{condidates1.voteCount}</h1>
    <h1>
   {
     account!=' '?<button onClick={()=>sub(condidates1.id)}>vote</button>:null
   
    } 

    </h1>
  </div>
  
  <div className="electioncss">
    <h1>Congress</h1>
    <election className="card">
      <img src="congress.png" alt="" srcset="" />

    </election>
    
      <h1>{condidates2.voteCount}</h1>
    <h1>
    {
     account!=' '?<button onClick={()=>sub(condidates2.id)}>vote</button>:null
   
    }
    </h1>
  </div>
  
   </div>

  {tran_loading?
   <div className="transaction_container">
  <h1>Transaction Details</h1>
  <div className="trans_detail">
      <div className="box">
      <label>  blockHash:</label>

        <text>{trans_detail_data.blockHash}</text>
      </div>
      <div className="box">
      <label> cumulativeGasUsed:</label>
       <text>{trans_detail_data.cumulativeGasUsed}</text>

      </div>
      <div className="box">
      <label>from:</label>
       <text>{trans_detail_data.from}</text>
      </div>
      <div className="box">
      <label> gasUsed:</label>
       <text>{trans_detail_data.gasUsed}</text>
      </div>
      <div className="box">
      <label> to:</label>
     <text>{trans_detail_data.to}</text>
      </div>
       
       <div className="box">

      
       
     <label>transactionHash:</label>    <text>{trans_detail_data.transactionHash}</text>
        
       </div>
   </div>
   
   </div>
   :null}
   
   
   </div>
       
      
      {/* <div>
       <h1>condiadata2</h1>
       {condidates2.id}
      {condidates2.name}
      {condidates2.voteCount}
    </div> */}
 
    </>
  )
 

      
  
};

export default App;


// import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

// import "./App.css";

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;
    
//     // Stores a given value, 5 by default.
//    await contract.methods.set(10).send({ from: accounts[0] ,
//    gasLimit: "25000",});
 
//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();
//    console.log(response)
//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

// export default App;
