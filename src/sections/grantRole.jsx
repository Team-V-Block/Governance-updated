import React, { Component } from 'react'
import { ethers } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import "../styles/add-voter.css";

export default class grantRole extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          address: "",
          stakeholders:"",
          candidates:"",
          vote:"",
          result:"",
          allowed: "",
    
        };
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeStake = this.handleChangeStake.bind(this);
        this.handleChangeCandidates = this.handleChangeCandidates.bind(this);
        this.handleChangeVote = this.handleChangeVote.bind(this);
        this.handleChangeResult = this.handleChangeResult.bind(this);
        this.handleChangeAllowed = this.handleChangeAllowed.bind(this);
      }
    
      /////// *******  HANDLES////////
    handleChangeAddress(event) {
      this.setState({address: event.target.value});
    }
    handleChangeStake(event) {
      this.setState({stakeholders: event.target.value});
    }
    handleChangeCandidates(event) {
      this.setState({candidates : event.target.value});
    }
    handleChangeVote(event) {
      this.setState({vote : event.target.value});
    }
    handleChangeResult(event) {
      this.setState({result : event.target.value});
    }
    handleChangeAllowed(event) {
      this.setState({allowed: event.target.value});
    }




 async grant() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()  
        const address = this.state.address;
        const stakeholders = this.state.stakeholders
        const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
        // add dropdown for grantrole and input
        const byte = await voteContract.grantRole(stakeholders,address);
        
        this.setState({byte});
}







  render() {
    return (
      <div className="container container-addVote form-container">
        <h3>Grant Role</h3>
        <div className="addVote-form">
        <input type="text" 
          value={this.state.address} 
          onChange={this.handleChangeAddress} 
          className="addVote-input"
          placeholder="input Address"/>
        
        <h3>Select Role</h3>
        <select value={this.state.stakeholders} onChange={this.handleChangeStake} className="addVote-input">
            <option value="0xdc1958ce1178d6eb32ccc146dcea8933f1978155832913ec88fa509962e1b413">Chairman</option>
            <option value="0xd16e204b8a42a15ab0ea6bb8ec1ecdfbe69f38074fc865323af19efe7d9573d9">Teacher</option>
            <option value="0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc">Student</option>
          </select>
       
        <button className="btn addVote-btn" onClick={() => this.grant()}>grantRole</button>
        </div>
      </div>
    )
  }
}
