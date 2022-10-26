export default function OffersTable(props) {
    const offers = props.offers;

    function getOffers() {
        let rows = [];
        for (let i = 0; i < offers.length; i++) {
            rows.push(<tr>
                <td className='border border-slate-300 p-6'>{offers[0][1]}</td>
                <td className='border border-slate-300 p-6'>{offers[0][0]}</td>
                <td className='border border-slate-300 p-6'>{offers[0][3]}</td>
                <td className='border border-slate-300 p-6'>{offers[0][2]}</td>
            </tr>)
        }
        return <>
            {[...rows]}
        </>;
    }
    return (
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
                {getOffers()}

            </tbody>
        </table>
    )
}