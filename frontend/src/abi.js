const VotingSystemABI = [
    {
        "inputs": [{"name": "_name", "type": "string"}],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "_candidateId", "type": "uint256"}],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "_candidateId", "type": "uint256"}],
        "name": "getCandidate",
        "outputs": [
            {"name": "", "type": "uint256"},
            {"name": "", "type": "string"},
            {"name": "", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "toggleVotingStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "_candidateId", "type": "uint256"}],
        "name": "getCandidateVotes",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "name": "id", "type": "uint256"},
            {"indexed": false, "name": "name", "type": "string"}
        ],
        "name": "CandidateAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "name": "candidateId", "type": "uint256"},
            {"indexed": false, "name": "voter", "type": "address"}
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "isOpen", "type": "bool"}],
        "name": "VotingStatusChanged",
        "type": "event"
    }
];
export default VotingSystemABI;
