import React, { Component, useState, useEffect } from "react";
import "../../dist/index.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { BigNumber } from "ethers";
import getGovernanceContract from "../utils/getGovernanceContract";

const VoteCandidate = () => {
  const [candidateId, setcandidateId] = useState("");
  const [contract, setContract] = useState(null);

  const handleChangeVote = (e) => {
    setcandidateId(e.target.value);
  };

  const _voteCandidate = async () => {
    await contract.vote(candidateId);
    contract.on("shareholderVoted", (voter, voted) =>
      alert(`${voter} voted candidate with ID ${voted.toNumber()}`)
    );
  };

  useEffect(() => {
    setContract(getGovernanceContract(window.ethereum));
    return () => {};
  }, []);

  return (
    // <section className="section">
    <div className="wrapper rounded">
      <h2 className="section__title title--medium">Vote Candidate</h2>
      <FormInput
        type={"number"}
        value={candidateId}
        onChangeHandler={handleChangeVote}
        className={"form__input rounded"}
        placeholder={"Input Candidate ID"}
      />
      <Button
        description={"Vote"}
        handler={_voteCandidate}
        className={"btn rounded"}
      />
    </div>
    // </section>
  );
};

export default VoteCandidate;
