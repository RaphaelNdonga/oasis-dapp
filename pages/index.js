import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import OasisAddress from "./blockchain/OasisGoerliAddress.json";
import OasisABI from "./blockchain/OasisGoerliABI.json";
import OffersTable from './components/OffersTable';
import React from 'react';

export default function Home() {

  const [connected, setConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [oasisContract, setOasisContract] = useState(null);
  const [offers, setOffers] = useState([]);

  async function connectMetamask() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      checkConnection(accounts);
    }
  }

  const checkConnection = async (accounts) => {
    console.log('checking accounts...', accounts);
    console.log(accounts[0])
    if (accounts[0] === null || accounts[0] === "" || accounts[0] === undefined) {
      console.log("Setting connected to false");
      setConnected(false);
      localStorage.removeItem("metamask");
      setSigner(null);
      setWeb3(null);
    } else {
      console.log("Setting connected to true");
      setConnected(true);
      localStorage.setItem("metamask", accounts[0]);
      setSigner(accounts[0]);
      const _web3 = new Web3(window.ethereum);
      setWeb3(_web3);
      const _oasisContract = new _web3.eth.Contract(OasisABI, OasisAddress);
      setOasisContract(_oasisContract);
      const _lastOfferId = await _oasisContract.methods.last_offer_id().call();
      console.log("last_offer_id: ", _lastOfferId);
      getOffers(_oasisContract, _lastOfferId)
    }
  }

  async function getOffers(oasisContract, lastOfferId) {
    for (let i = 1; i <= lastOfferId; i++) {
      const currentOffer = await oasisContract.methods.getOffer(i).call();

      if (currentOffer[0] != 0) {
        console.log(currentOffer);
        setOffers(prevOffers => [...prevOffers, currentOffer])
      }

    }
  }

  useEffect(() => {
    const account = localStorage.getItem("metamask");
    checkConnection([account]);

    window.ethereum.on("accountsChanged", checkConnection);

    return () => {
      window.ethereum.removeListener("accountsChanged", checkConnection);
    }
  }, [])

  return (
    <>
      <nav className='flex item-center justify-between flex-wrap bg-teal-500 text-white p-6'>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className='font-semibold text-xl tracking-tight'>
            OASIS DEX PLAYGROUND
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="make_offer" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Make Offer
            </a>
          </div>
        </div>
        {!connected ? <a href="#" onClick={connectMetamask} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Connect Wallet</a> : <a href="#" className="inline-block text-sm px-4 py-2 border-transparent text-teal-500 bg-white mt-4 lg:mt-0">Connected</a>
        }

      </nav>
      <main>
        <div>
          <div className='flex item-center justify-center p-6'>
            <h1 className='underline decoration-double text-xl'>
              OFFERS LIST
            </h1>
          </div>
          <div className='flex item-center justify-center p-6 pt-0'>
            <OffersTable offers={offers} />
          </div>
        </div>
      </main>
    </>
  )
}
