import React, { Component } from 'react'
import { ethers } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import "../styles/add-voter.css";

export default class addCandidate extends Component {
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




    async addCandidates() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const name = this.state.candidates
        const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
        const add = await voteContract.addCandidates([name])
        
        this.setState({add});
        }






  render() {
    return (
      <div className="container container-addVote form-container">
        <h3>Add Candidate</h3>
        <div className="addVote-form">
        <input type="text" 
          value={this.state.candidates} 
          onChange={this.handleChangeCandidates} 
          className="addVote-input"
          placeholder="input Address"/>
        <button className="btn addVote-btn" onClick={() => this.addCandidates()}>Add Candidate</button>
        </div>
      </div>
    )
  }
}
