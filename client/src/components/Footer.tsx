import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='bg-stone-500 py-10'>
        <div className='container flex justify-between items-center mx-auto'>
           <span className='text-white font-bold tracking-tight'><Link to="/">Rentlify.com</Link></span>
           <span className='text-white font-bold tracking-tight flex gap-4'>
            <Link to="/terms&condition" className='cursor-pointer'>Terms of service</Link>
            <Link to="/privacy&policy" className='cursor-pointer'>Privacy Policy</Link>
           </span>
        </div>
    </div>
  )
}

export default Footer