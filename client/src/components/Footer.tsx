import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='bg-stone-500 py-10'>
        <div className='container flex justify-between items-center mx-auto'>
           <span className='text-white font-bold tracking-tight'><Link to="/">Rentlify.com</Link></span>
           <span className='text-white font-bold tracking-tight flex gap-4'>
            <p className='cursor-pointer'>Privacy Policy</p>
            <p className='cursor-pointer'>Terms of service</p>
           </span>
        </div>
    </div>
  )
}

export default Footer