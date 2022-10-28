import React from "react";
import { ethers } from "ethers";
export default function OffersTable({ offers, buy }) {
    return (
        <div className="overflow-x-auto relative">
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className='py-3 px-6'>Buy</th>
                        <th scope="col" className='py-3 px-6'>Price</th>
                        <th scope="col" className='py-3 px-6'>Sell</th>
                        <th scope="col" className='py-3 px-6'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {offers ? offers.map(offer => <tr key={offers.indexOf(offer)} onClick={() => { buy(offers.indexOf(offer) + 1, ethers.utils.parseUnits(offer[0], "wei")) }} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                        <td className='py-4 px-6'>{offer[1]}</td>
                        <td className='py-4 px-6'>{ethers.utils.formatEther(offer[0])} ETH</td>
                        <td className='py-4 px-6'>{offer[3]}</td>
                        <td className='py-4 px-6'>{ethers.utils.formatEther(offer[2])} ETH</td>
                    </tr>) : <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>}

                </tbody>
            </table>
        </div>
    )
}