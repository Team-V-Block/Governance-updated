import "../styles/check-voter-address.css";

const CheckVoterAddress = ({
  voterAddressToCheck,
  setVoterAddressToCheck,
  checkAddressVoter,
  voterStatus,
}) => {
  const handleNewAddressToCheckVote = (e) => {
    setVoterAddressToCheck(e.target.value);
  };
  return (
    <div className="wrapper wrapper--form">
      <h4 className="">Check if an address has vote status</h4>
      <div className="">
        <input
          value={voterAddressToCheck}
          onChange={handleNewAddressToCheckVote}
          className="input"
          placeholder="Input Address"
        />
        <button onClick={checkAddressVoter} className="btn">
          Check
        </button>
      </div>
      {voterStatus !== "An error has occured" && voterStatus && (
        <div style={{ paddingTop: "2em" }}>
          <h4>Voter Status</h4>
          <p>Account: {voterAddressToCheck}</p>
          <p>Voted: {voterStatus?.voted?.toString()}</p>
          <p>Vote Weight: {Number(voterStatus?.weight?._hex)}</p>
        </div>
      )}{" "}
      {voterStatus === "An error has occured" && <p>{voterStatus}</p>}
    </div>
  );
};

export default CheckVoterAddress;
