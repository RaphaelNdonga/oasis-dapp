import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <nav className='flex item-center justify-center flex-wrap bg-teal-500 text-white p-6'>
        <span className='font-semibold text-xl tracking-tight'>
          OASIS DEX PLAYGROUND
        </span>
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
