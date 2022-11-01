import React from "react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Web3 from "web3";
import OasisAddress from "../blockchain/OasisGoerliAddress.json";
import OasisABI from "../blockchain/OasisGoerliABI.json";
import ERC20ABI from "../blockchain/ERC20ABI.json";
import { ethers } from "ethers";

export default function Get_Offer() {
    const homeRef = useRef(null);
    const [web3, setWeb3] = useState(null);
    const [oasisContract, setOasisContract] = useState(null);
    const [buyingAmount, setBuyingAmount] = useState("");
    const [daiAddress, setDaiAddress] = useState("0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844");
    const [buyingAddress, setBuyingAddress] = useState("");

    async function approve(address, amount) {
        const erc20Contract = new web3.eth.Contract(ERC20ABI, address);
        await erc20Contract.methods.approve(OasisAddress, amount).send({ from: localStorage.getItem("metamask") });
    }


    async function getBestOffer() {
        console.log("oasis contract: ", oasisContract);
        const bestOfferId = await oasisContract.methods.getBestOffer(buyingAddress, daiAddress).call();
        console.log("Best offer id: ", bestOfferId);

        const offerCount = await oasisContract.methods.getOfferCount(buyingAddress, daiAddress).call();
        console.log("offer count: ", offerCount);

        const bestOffer = await oasisContract.methods.getOffer(bestOfferId).call();
        console.log("best offer: ", bestOffer);
        const worseOfferId = await oasisContract.methods.getWorseOffer(bestOfferId).call();
        const worseOffer = await oasisContract.methods.getOffer(worseOfferId).call();
        console.log("worse offer: ", worseOffer);

        const worserOfferId = await oasisContract.methods.getWorseOffer(worseOfferId).call();
        const worserOffer = await oasisContract.methods.getOffer(worserOfferId).call();
        console.log("worser offer: ", worserOffer);

        await approve(bestOffer[3], ethers.utils.parseUnits(bestOffer[2]));

        await oasisContract.methods.buy(bestOfferId, ethers.utils.parseEther(buyingAmount)).send({ from: localStorage.getItem("metamask") });
    }

    const checkConnection = async (accounts) => {
        console.log('checking accounts...', accounts);
        console.log(accounts[0])
        if (accounts[0] === null || accounts[0] === "" || accounts[0] === undefined) {
            localStorage.removeItem("metamask");
            setWeb3(null);
            homeRef.current.click();
        } else {
            localStorage.setItem("metamask", accounts[0]);
            const _web3 = new Web3(window.ethereum);
            setWeb3(_web3);
        }
    }

    useEffect(() => {
        const _web3 = new Web3(window.ethereum);
        setWeb3(_web3);
        const oContract = new _web3.eth.Contract(OasisABI, OasisAddress);
        setOasisContract(oContract);

        window.ethereum.on("accountsChanged", checkConnection);

        return () => {
            window.ethereum.removeListener("accountsChanged", checkConnection);
        }
    }, [])

    return (<>
        <nav className='flex item-center justify-between flex-wrap bg-teal-500 text-white p-6'>
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link ref={homeRef} href="/">
                    <a className='font-semibold text-xl tracking-tight'>OASIS DEX PLAYGROUND</a>
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
        </nav>
        <main>
            <div className='flex item-center justify-center p-6'>
                <form className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Token you want to Buy
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter address" onChange={(e) => {
                                setBuyingAddress(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Dai to Spend
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter amount" onChange={(e) => {
                                setBuyingAmount(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={getBestOffer}>
                                Get Best Offer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>

    </>)
}