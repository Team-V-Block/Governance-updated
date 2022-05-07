import { ethers } from "ethers";
import ABI from "../../artifacts/contracts/Governance.sol/Governance.json";

// const contractAddress = "0x64bC644e2225D7e6B75A8543221556e0E1A5a955";
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const getGovernanceContract = (ethereum) => {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, ABI.abi, signer);
  } else {
    return undefined;
  }
};

export default getGovernanceContract;
