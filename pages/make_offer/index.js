import { useEffect, useState } from "react";
import Web3 from "web3";
import OasisAddress from "../blockchain/OasisGoerliAddress.json";
import OasisABI from "../blockchain/OasisGoerliABI.json";
import { ethers } from "ethers";

export default function Make_Offer() {
    const [buyingAddress, setBuyingAddress] = useState("");
    const [sellingAddress, setSellingAddress] = useState("");
    const [buyingPrice, setBuyingPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [oasisContract, setOasisContract] = useState(null);

    useEffect(() => {
        const web3 = new Web3(window.ethereum);
        const oContract = new web3.eth.Contract(OasisABI, OasisAddress);
        setOasisContract(oContract);
    }, [])

    const placeOffer = async () => {
        try {
            const _sellingPrice = ethers.utils.parseEther("0.001");
            const _buyingPrice = ethers.utils.parseEther("0.001");
            const _sellingAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
            const _buyingAddress = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"
            let last_offer_id = await oasisContract.methods.last_offer_id().call();
            last_offer_id = parseInt(last_offer_id);
            console.log(oasisContract);
            await oasisContract.methods.offer(_sellingPrice, _sellingAddress, _buyingPrice, _buyingAddress, 3).send({
                from: localStorage.getItem("metamask")
            });
        } catch (error) {
            alert("Error occurred: ", error);
        }

    }
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
            </nav>
            <main>
                <div className='flex item-center justify-center p-6'>
                    <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Token Buying Address
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