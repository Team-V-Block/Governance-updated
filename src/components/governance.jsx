import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import "../styles/governance.css";

const Vote = () => {
  // Variables
  const contractAddress = "0x64bC644e2225D7e6B75A8543221556e0E1A5a955";
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chairmanRole, setChairmanRole] = useState(null);
  const [teacherRole, setTeacherRole] = useState(null);
  const [studentRole, setStudentRole] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectBtnText, setConnectBtnText] = useState("Connect to Metamask");
  const [errorMessage, setErrorMessage] = useState();

  // Connect To MetaMask
  const connectToMetamask = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setDefaultAccount(accounts[0].toString());
          updateEthers();
          setConnectBtnText(" MetaMask Connected ✔");
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } else {
      setErrorMessage("Install MetaMask to Continue!");
    }
  };

  const updateEthers = () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let tempContract = new ethers.Contract(contractAddress, ABI.abi, signer);
    setContract(tempContract);
  };

  const updateBalance = () => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [defaultAccount, "latest"],
      })
      .then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      })
      .catch((err) => console.log(err.message));
  };

  // ******* READ FUNCTIONS *******
  useEffect(() => {
    updateBalance();
    async function updateRoles() {
      setChairmanRole(await contract.CHAIRMAN_ROLE());
      setTeacherRole(await contract.TEACHER_ROLE());
      setStudentRole(await contract.STUDENT_ROLE());
    }
    updateRoles();
  }, [defaultAccount, contract]);

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
        <>
          <button className="btn-connect btn" onClick={connectToMetamask}>
            {connectBtnText}
          </button>
          {errorMessage}
        </>
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
