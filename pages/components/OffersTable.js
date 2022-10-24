import OasisAddress from "../blockchain/OasisAddress.json";
import OasisABI from "../blockchain/OasisABI.json";

export default function OffersTable(props) {
    const web3 = props.web3;
    const oasisContract = web3 ? new web3.eth.Contract(OasisABI, OasisAddress).toString() : "x";
    return (
        <>
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
                        <td className='border border-slate-300 p-6'>{oasisContract}</td>
                        <td className='border border-slate-300 p-6'>10</td>
                        <td className='border border-slate-300 p-6'>y</td>
                        <td className='border border-slate-300 p-6'>10</td>
                    </tr>

                </tbody>
            </table>
        </>
    )
}