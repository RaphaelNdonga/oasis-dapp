import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import OasisAddress from "../blockchain/OasisGoerliAddress.json";
import OasisABI from "../blockchain/OasisGoerliABI.json";
import { ethers } from "ethers";
import ERC20ABI from "../blockchain/ERC20ABI.json";

export default function Make_Offer() {
    const [buyingAddress, setBuyingAddress] = useState("");
    const [sellingAddress, setSellingAddress] = useState("");
    const [buyingPrice, setBuyingPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [web3, setWeb3] = useState(null);
    const [oasisContract, setOasisContract] = useState(null);
    const homeRef = useRef(null);



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

    const placeOffer = async () => {
        try {
            const _sellingPrice = ethers.utils.parseEther(sellingPrice);
            const _buyingPrice = ethers.utils.parseEther(buyingPrice);
            console.log(`Arguments: ${_sellingPrice} ${sellingAddress} ${_buyingPrice} ${buyingAddress}`);
            await approve(sellingAddress, _sellingPrice);
            await approve(buyingAddress, _buyingPrice);
            console.log(oasisContract);
            await oasisContract.methods.offer(_sellingPrice, sellingAddress, _buyingPrice, buyingAddress).send({
                from: localStorage.getItem("metamask")
            });
        } catch (error) {
            alert("Error occurred: ", error);
            console.log(`error: ${error}`);
        }

    }

    async function approve(address, amount) {
        const erc20Contract = new web3.eth.Contract(ERC20ABI, address);
        await erc20Contract.methods.approve(OasisAddress, amount).send({ from: localStorage.getItem("metamask") });
    }

    return (
        <>
            <nav className='flex item-center justify-between flex-wrap bg-teal-500 text-white p-6'>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <a ref={homeRef} href="/" className='font-semibold text-xl tracking-tight'>
                        OASIS DEX PLAYGROUND
                    </a>
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
                                    Token Buying Address (DAI)
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
                                    Token Buying Price
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter amount" onChange={(e) => {
                                    setBuyingPrice(e.target.value);
                                }} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Token Selling Address
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter address" onChange={(e) => {
                                    setSellingAddress(e.target.value);
                                }} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Token Selling Price
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter amount" onChange={(e) => {
                                    setSellingPrice(e.target.value);
                                }} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={placeOffer}>
                                    Place Offer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

        </>
    )
}