import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import OasisAddress from "./blockchain/OasisAddress.json";
import OasisABI from "./blockchain/OasisABI.json";

export default function Home() {

  const [connected, setConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [oasisContract, setOasisContract] = useState(null);

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
      const lastOfferId = await _oasisContract.methods.last_offer_id().call();
      console.log(lastOfferId);
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
        <span className='font-semibold text-xl tracking-tight'>
          OASIS DEX PLAYGROUND
        </span>
        {!connected ? <a href="#" onClick={connectMetamask} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Connect Wallet</a> : <a href="#" class="inline-block text-sm px-4 py-2 border-transparent text-teal-500 bg-white mt-4 lg:mt-0">Connected</a>
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
            <table className='table-auto border-collapse border border-slate-400'>
              <thead>
                <tr>
                  <th className='border border-slate-300 p-6'>Buy</th>
                  <th className='border border-slate-300 p-6'>Price</th>
                  <th className='border border-slate-300 p-6'>Sell</th>
                  <th className='border border-slate-300 p-6'>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-slate-300 p-6'>x</td>
                  <td className='border border-slate-300 p-6'>10</td>
                  <td className='border border-slate-300 p-6'>y</td>
                  <td className='border border-slate-300 p-6'>10</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
