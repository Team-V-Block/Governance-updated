import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";
import getGovernanceContract from "../utils/getGovernanceContract";
import "../../dist/index.css";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Dropdown from "../components/Dropdown";
import VoteCandidate from "./voteCandidate";
import { NavLink } from "react-router-dom";
import grantRole from "./grantRole";

const Vote = () => {
  // =====================
  //  VARIABLES AND STATE
  // =====================

  const [defaultAccount, setDefaultAccount] = useState("");
  const [balance, setBalance] = useState(null);
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

  // Connect To MetaMask

  const connectToMetamask = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setDefaultAccount(accounts[0].toString());
          setContract(getGovernanceContract(window.ethereum));
          setConnectBtnText(" MetaMask Connected ✔");
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } else {
      setErrorMessage("Install MetaMask to Continue!");
    }
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

  const roleReadable = (roleHash) => {
    switch (roleHash) {
      case chairmanRole:
        return "Chairman";
      case teacherRole:
        return "Teacher";
      case studentRole:
        return "Student";
      default:
        return "Unassigned";
    }
  };

  // Update Contract dependent Variables

  useEffect(() => {
    updateBalance();
    const updateVars = async () => {
      setChairmanRole(await contract.CHAIRMAN_ROLE());
      setTeacherRole(await contract.TEACHER_ROLE());
      setStudentRole(await contract.STUDENT_ROLE());
      setCandidates(await contract.getCandidates());
      setOwnRole(await contract.getRole(defaultAccount));
    };
    updateVars();
    return () => {};
  }, [contract]);

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
          <Button
            description={connectBtnText}
            handler={connectToMetamask}
            className={"btn btn--connect rounded"}
          />

          {errorMessage}
        </>
      ) : (
        <>
          <header className="header">
            <h1 className="header__title title--large">ZURI Governance App</h1>
          </header>
          <section className="section">
            <div className="section__card ">
              <p className="section__address contained "> {defaultAccount}</p>
              <p className="section__balance contained ">
                Eth Balance: {balance}
              </p>
              <p className="section__role contained ">
                Role: {roleReadable(ownRole)}
              </p>
            </div>
            <div className="wrapper rounded">
              <FormInput
                type={"text"}
                value={address}
                onChangeHandler={handleChange}
                placeholder={"Input address"}
                className={"form__input rounded"}
              />
              <Dropdown
                onChangeHandler={validateRole}
                roles={{
                  chairman: chairmanRole,
                  teacher: teacherRole,
                  student: studentRole,
                }}
              />
              <Button
                description={"Grant Role"}
                handler={grantHandler}
                className={"btn rounded"}
              />
            </div>
            <div className="wrapper rounded">
              <div className="spread mb-1">
                <span className="title title--small">Name</span>
                <span className="title title--small">Votes</span>
              </div>
              {candidates != null
                ? candidates.map(({ name, voteCount }, idx) => (
                    <>
                      <div key={idx.toString()} className="spread">
                        <span>{name}</span>
                        <span>{voteCount.toNumber()}</span>
                      </div>
                      <br />
                    </>
                  ))
                : null}
            </div>

            <VoteCandidate />
            <div className="wrapper  rounded">
              <Button
                description={"Add Candidate"}
                handler={addCandidates}
                className={"btn rounded"}
              />
              <Button
                description={"Vote Candidates"}
                handler={voteCandidate}
                className={"btn rounded"}
              />
              <Button
                description={"Change Result Access Status"}
                handler={changeResultOf}
                className={"btn rounded"}
              />
              <Button
                description={"Change Voting status"}
                handler={changeVoting}
                className={"btn rounded"}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Vote;
