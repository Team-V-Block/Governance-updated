import { useState } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import "../styles/governance.css";

const Vote = () => {
  // Variables
  const contractAddress = "0x64bC644e2225D7e6B75A8543221556e0E1A5a955";
  const [voteContract, setVoteContract] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chairmanRole, setChairmanRole] = useState(null);
  const [teacherRole, setTeacherRole] = useState(null);
  const [studentRole, setStudentRole] = useState(null);

  // Connect To MetaMask
  const connectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const addressBalance = ethers.utils.formatEther(balance);

    // ******* READ FUNCTIONS *******

    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);

    // setVoteContractRead(contractRead);
    setVoteContract(contract);

    const Chairman = await voteContract.CHAIRMAN_ROLE();
    const Teacher = await voteContract.TEACHER_ROLE();
    const Student = await voteContract.STUDENT_ROLE();

    setDefaultAccount(accounts[0]);
    setBalance(addressBalance);
    setChairmanRole(Chairman);
    setTeacherRole(Teacher);
    setStudentRole(Student);
  };

  // ******* WRITE FUNCTIONS *******

  // Grant Role
  const grant = async () => {
    await voteContract.grantRole(
      "0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc",
      "0x777094c9Ede5AD9E04d2b2f00f992CD7f9B0A85C"
    );
  };

  // Change Result Status
  const changeResultOf = async () => {
    await voteContract.changeResultStatus(true);
  };

  // Vote
  const voteCandidate = async () => {
    await voteContract.vote(BigNumber.from("2"));
  };

  // Add Candidates
  const addCandidates = async () => {
    await voteContract.addCandidates(["Hollio"]);
  };

  // Change Voting Status
  const changeVoting = async () => {
    await voteContract.changeVotingAllowed(false);
  };

  // Render MetaMask Button
  return (
    <>
      {!defaultAccount ? (
        <button className="btn-connect btn" onClick={connectToMetamask}>
          Connect to Metamask
        </button>
      ) : (
        <div className="container">
          <div className="header">
            <h1 className="title">ZURI Governance App</h1>
          </div>
          <div className="text-container">
            <div className="user-card">
              <p className="user-address">Welcome {defaultAccount}</p>
              <p className="user-balance">Your Balance is: {balance}</p>
            </div>
            <div className="role-info">
              <p className="role">Chairman: {chairmanRole}</p>
              <p className="role">Student: {studentRole}</p>
              <p className="role">Teacher: {teacherRole}</p>
            </div>
          </div>
          <div className="button-container">
            <button className="btn btn-grant" onClick={grant}>
              grantRole
            </button>
            <button className="btn btn-add" onClick={addCandidates}>
              addCandidates
            </button>
            <button className="btn btn-vote" onClick={voteCandidate}>
              Vote Candidates
            </button>
            <button className="btn btn-changeStatus" onClick={changeResultOf}>
              changeResultStatus
            </button>
            <button className="btn btn-changeVoting" onClick={changeVoting}>
              ChangeVotingAllowed
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Vote;
