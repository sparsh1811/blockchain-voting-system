```javascript
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { abi } from "./abi"; // Import the contract ABI

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voted, setVoted] = useState(false);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Use environment variable for contract address

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
          setContract(contractInstance);

          const candidatesCount = await contractInstance.methods.candidatesCount().call();
          const candidatesList = [];
          for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await contractInstance.methods.getCandidate(i).call();
            candidatesList.push(candidate);
          }
          setCandidates(candidatesList);
          setLoading(false);

          const hasVoted = await contractInstance.methods.voters(accounts[0]).call();
          setVoted(hasVoted);
        } catch (error) {
          setError("Error connecting to MetaMask: " + error.message);
        }
      } else {
        setError("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const castVote = async (candidateId) => {
    if (voted) {
      setError("You have already voted!");
      return;
    }

    try {
      await contract.methods.vote(candidateId).send({ from: account });
      setVoted(true);
      alert("Vote cast successfully!");
      window.location.reload();
    } catch (error) {
      setError("Error casting vote: " + error.message);
    }
  };

  const handleVote = (candidateId) => {
    if (voted) {
      alert("You have already voted!");
    } else {
      castVote(candidateId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Blockchain Voting System</h1>
      <p>Connected Account: {account}</p>
      <h2>Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate[0]}>
            {candidate[1]} - Votes: {candidate[2]}
            <button onClick={() => handleVote(candidate[0])}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```;
