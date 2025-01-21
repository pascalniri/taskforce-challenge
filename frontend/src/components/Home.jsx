import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='mx-auto max-w-7xl grid lg:grid-cols-2 justify-items-center font-quicksand px-4 md:px-[30px] xl:px-0'>
      <div className='flex flex-col justify-center items-start text-left'>
        <h1 className='text-[35px] md:text-[48px] font-semibold'>Your Digital Wallet, Simplified</h1>
        <p>Securely manage your money and information in one place. With real-time tracking, seamless transactions, and robust security, take control of your financial life like never before.</p>

        <Link to='/signup'>
          <button className='bg-[#5E3BE8] px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] mt-[2rem]'>Get started now</button>
        </Link>
      </div>
      <div>
        <img src="/walletHero.png" alt="" />
      </div>
    </div>
  )
}

export default Home
