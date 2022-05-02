import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import "../styles/governance.css";
// import { NavLink } from "react-router-dom";

const Vote = () => {
  // Variables
  const contractAddress = "0x64bC644e2225D7e6B75A8543221556e0E1A5a955";
  const [defaultAccount, setDefaultAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [Role, setRole] = useState(null);
  const [chairmanRole, setChairmanRole] = useState(null);
  const [teacherRole, setTeacherRole] = useState(null);
  const [studentRole, setStudentRole] = useState(null);
  const [ownRole, setOwnRole] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectBtnText, setConnectBtnText] = useState("Connect to Metamask");
  const [errorMessage, setErrorMessage] = useState();
  const [stakeholder, setStakeholder] = useState("");
  const [address, setAddress] = useState("");
  const [candidates, setCandidates] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [vote, setVote] = useState(null);
  const [result, setResult] = useState(null);
  const [allowed, setAllowed] = useState(null);
  const [byte, setByte] = useState(null);

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

  // Check Own Role
  const checkOwnRole = async () => {
    setOwnRole(await contract.getRole(defaultAccount));
  };

  useEffect(() => {
    // ******* READ FUNCTIONS *******
    updateBalance();
    checkOwnRole();
    async function updateRoles() {
      setChairmanRole(await contract.CHAIRMAN_ROLE());
      setTeacherRole(await contract.TEACHER_ROLE());
      setStudentRole(await contract.STUDENT_ROLE());
      setRole(await contract.getRole(defaultAccount));
    }
    updateRoles();
  }, [defaultAccount, contract]);

  // ******* WRITE FUNCTIONS *******
  // Grant Role
  const grant = async (stakeholder, address) => {
    await contract.grantRole(stakeholder, address);
    await contract.on("roleGranted", (address, stakeholder) => {
      alert(`${address} was granted role: ${stakeholder}`);
    });
  };

  // Change Result Status
  const changeResultOf = async () => {
    await contract.changeResultStatus(true);
    // Function does not have an event that the frontend can read from
  };

  // Vote
  const voteCandidate = async () => {
    await contract.vote(BigNumber.from("2"));
    await contract.on("shareholderVoted", (account, candidateIdx) => {
      alert(`${candidateIdx} was voted for by: ${account}`);
    });
  };

  // Add Candidates
  const addCandidates = async () => {
    await contract.addCandidates([
      "Prosper",
      "Promise",
      "Omotola",
      "Daniel",
      "Xyluz",
      "Coordinator",
      "Ghost",
      "Chikire",
      "Mustafa",
      "Olivia",
    ]);
    // Function does not have an event that the frontend can read from
  };

  // Change Voting Status
  const changeVoting = async () => {
    await contract.changeVotingAllowed(false);
    // Function does not have an event that the frontend can read from
  };

  // Input Change handler
  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  // Validate Role Selection
  const validateRole = (e) => {
    setStakeholder(e.target.value);
    console.log(stakeholder);
  };

  // Grant handler
  const grantHandler = () => {
    grant(stakeholder, address);
    setStakeholder("");
    setAddress("");
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
              <p className="user-role">Your Role hash is: {ownRole}</p>
            </div>
            {/* <div className="role-info">
              <p className="role">Chairman: {chairmanRole}</p>
              <p className="role">Student: {studentRole}</p>
              <p className="role">Teacher: {teacherRole}</p>
            </div> */}
          </div>
          <div className="button-container">
            <form action="" id="role-form">
              <input
                type="text"
                value={address}
                placeholder="Input addresss"
                onChange={handleChange}
                className="input"
              />
            </form>
            <label htmlFor="roles" className="role-label">
              Assign address a Role
            </label>
            <select
              name="roles"
              id=""
              form="role-form"
              onChange={validateRole}
              className="role-dropdown"
            >
              <option value="0xdc1958ce1178d6eb32ccc146dcea8933f1978155832913ec88fa509962e1b413">
                Chairman
              </option>
              <option value="0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc">
                Teacher
              </option>
              <option
                value="0xd16e204b8a42a15ab0ea6bb8ec1ecdfbe69f38074fc865323af19efe7d9573d9

"
              >
                Student
              </option>
            </select>
            <button className="btn btn-grant" onClick={grantHandler}>
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
          </div>{" "}
          */}
        </div>
      )}
    </>
  );
};

export default Vote;
