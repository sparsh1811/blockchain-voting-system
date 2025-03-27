# Blockchain-Based Voting System

## Installation

To clone the repository and set up the project locally, run the following commands:

```bash
git clone <repository-url>
cd blockchain-voting-system
npm install
```

## Usage

To run the application, use the following command:

```bash
npm start
```

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for any changes.

## Project Overview

A decentralized voting application built on Ethereum blockchain using Solidity and Web3.js.

## Features

- Secure, transparent voting mechanism
- Admin can add candidates
- Voters can cast a single vote
- Real-time vote tracking
- Voting can be opened/closed by admin

## Prerequisites

- Node.js
- Truffle
- Ganache
- MetaMask Browser Extension

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/blockchain-voting-system.git
cd blockchain-voting-system
```

2. Install dependencies

```bash
npm install
```

3. Start Ganache
4. Compile and migrate contracts

```bash
truffle compile
truffle migrate
```

5. Start the frontend

```bash
# Use a local server to serve index.html
```

## Usage

1. Connect MetaMask
2. Select candidate
3. Cast vote
4. View real-time results

## Testing

```bash
truffle test
```

## Security Considerations

- Only one vote per address
- Admin-controlled candidate addition
- Voting status can be toggled

## License

MIT License
