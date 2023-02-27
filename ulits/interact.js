const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
import { config } from '../dapp.config'
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('../scripts/whitelist.js')

// global BigInt

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL)
const contract = require('../artifacts/contracts/Mytoken.sol/MyToken.json')
const nftContract = new web3.eth.Contract(contract.abi, config.contractAddress)

// Calculate merkle root from the whitelist array
const leafNodes = whitelist.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const root = merkleTree.getRoot()



//Set up goPublicMint------------------------------------------------------------------------------------>

export const goPublicMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }

  const leaf = keccak256(window.ethereum.selectedAddress)
  const proof = merkleTree.getHexProof(leaf)

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root)
 let cost = config.mintPrice
  if (isValid) {

  	 cost = config.mintPriceWL			

}

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )

  // Set up our Ethereum transaction

  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(cost*mintAmount), 'Wei')
    ).toString(16), // hex
    gas: String(25000 * mintAmount),
    data: nftContract.methods
      .goPublicMint(mintAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">
          <p className='underline'>✅ Check out your transaction on Etherscan ✅</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: '😞 Ooops!:' + error.message
    }
  }
}



//Set up goListMint------------------------------------------------------------------------------------>

export const goListMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }

  const leaf = keccak256(window.ethereum.selectedAddress)
  const proof = merkleTree.getHexProof(leaf)

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root)

  if (!isValid) { 
    return {
      success: false,
      status: '❌ Invalid Merkle Proof - You are not whitelisted'
    }
  }
  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )

  // Set up our Ethereum transaction

  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(config.mintPriceWL*mintAmount), 'Wei')
    ).toString(16), // hex
    gas: String(25000 * mintAmount),
    data: nftContract.methods
      .goListMint(mintAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">
          <p className='underline'>✅ Check out your transaction on Etherscan ✅</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: '😞 Ooops!:' + error.message
    }
  }
  }
  
  
  
  //Set up goMintFromWhiteList------------------------------------------------------------------------------------>

export const goMintFromWhiteList = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }

  const leaf = keccak256(window.ethereum.selectedAddress)
  const proof = merkleTree.getHexProof(leaf)

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root)

  if (!isValid) { 
    return {
      success: false,
      status: '❌ Invalid Merkle Proof - You are not whitelisted'
    }
  }
  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )

  // Set up our Ethereum transaction

  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(config.mintPriceWL*mintAmount), 'Wei')
    ).toString(16), // hex
    gas: String(25000 * mintAmount),
    data: nftContract.methods
      .goMintFromWhiteList(mintAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">
          <p className='underline'>✅ Check out your transaction on Etherscan ✅</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: '😞 Ooops!:' + error.message
    }
  }
}
