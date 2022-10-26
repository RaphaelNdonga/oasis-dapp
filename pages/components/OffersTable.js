export default function OffersTable(props) {
    const offers = props.offers;

    function getOffers() {
        let rows = [];
        for (let i = 0; i < offers.length; i++) {
            rows.push(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className='py-4 px-6'>{offers[0][1]}</td>
                <td className='py-4 px-6'>{offers[0][0]}</td>
                <td className='py-4 px-6'>{offers[0][3]}</td>
                <td className='py-4 px-6'>{offers[0][2]}</td>
            </tr>)
        }
        return <>
            {[...rows]}
        </>;
    }
    return (
        <div class="overflow-x-auto relative">
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
                    {getOffers()}

                </tbody>
            </table>
        </div>
    )
}