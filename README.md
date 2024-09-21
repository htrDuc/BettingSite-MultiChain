# Betting Site Development

Welcome to the Betting Site Development repository. This project aims to create a cutting-edge online betting platform that operates seamlessly across multiple blockchains, including Solana, Ethereum, and BNB.

## Table of Contents
- [Overview](#overview)
- [Environment](#environment)
- [Getting Started](#getting-started)

## Overview

Our platform is an online betting site that offers a variety of games, including Dice, Slots, Flip, and others. Users can connect their wallets to participate in these games, place bets, and manage their funds directly through the site.

## Environment

- If you meet any error while running the project, check the options bellow.
And if you are using Windows, it is recommended to run the project using powershell or cmd.
- Node verion: v22 or later
- OS: Mac, Windows, Linux
- Please check the port.

## Getting Started

To get started with the project, clone the repository and install the necessary dependencies:

# Init DB
```bash
docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest



```bash
git clone https://github.com/Betting-Devs/BettingSite-MultiChain.git
cd BettingSite-MultiChain
cp .env.example .env
npm install
npm start


