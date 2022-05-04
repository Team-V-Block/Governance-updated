import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import "../styles/governance.css";
import { NavLink } from "react-router-dom";

const Vote = () => {
  // =====================
  //  VARIABLES AND STATE
  // =====================

  // const contractAddress = "0x64bC644e2225D7e6B75A8543221556e0E1A5a955";
  const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

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
  const [candidates, setCandidates] = useState([]);
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

  const roleReadable = (roleHash) => {
    switch (roleHash) {
      case chairmanRole:
        return "Chairman"; // not sure about using the return keyword here
      case teacherRole:
        return "Teacher";
      case studentRole:
        return "Student";
      default:
        return "Unassigned";
    }
  };

  useEffect(() => {
    // ==========================
    //  CONTRACT READ FUNCTIONS
    // ==========================

    updateBalance();
    checkOwnRole();
    async function updateVars() {
      setChairmanRole(await contract.CHAIRMAN_ROLE());
      setTeacherRole(await contract.TEACHER_ROLE());
      setStudentRole(await contract.STUDENT_ROLE());
      setRole(await contract.getRole(defaultAccount));
      setCandidates(await contract.getCandidates());
    }
    updateVars();
  }, [defaultAccount, contract]);

  // ==========================
  //  CONTRACT WRITE FUNCTIONS
  // ==========================

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

  // ========================
  //  EVENT HANDLER FUNCTIONS
  // ========================

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
              <p className="user-role">Your Role is: {roleReadable(ownRole)}</p>
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
              value={""}
            >
              <option value=""></option>
              <option value={chairmanRole}>Chairman</option>
              <option value={teacherRole}>Teacher</option>
              <option value={studentRole}>Student</option>
            </select>
            <button className="btn btn-grant" onClick={grantHandler}>
              grantRole
            </button>
            {candidates != null
              ? candidates.map(({ name, voteCount }, idx) => (
                  <>
                    <div key={idx}>
                      {name} has {voteCount.toNumber()} Votes
                    </div>
                    <br />
                  </>
                ))
              : "speak"}
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
        </div>
      )}
    </>
  );
};

export default Vote;
