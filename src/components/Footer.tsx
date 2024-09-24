import { Link } from 'react-router-dom'
import AppImages from '../constants/app_images'

const Footer = () => {
  return (
    <footer className="bg-[#E6DFC3aa] text-gray-700">
      <div className="max-w-8xl mx-auto p-4">
        <div className='flex items-center max-md:flex-col'>
        <img src={AppImages.logo} className=' h-28 max-md:w-96 mr-44 ml-20' alt="GreenConnect Logo" />

<div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-md:gap-x-32 flex-grow">

  <div>
    <h2 className="text-xl font-semibold mb-4 text-green-800">Quick Links</h2>
    <ul className="space-y-2">
      <li><Link to="/" className="hover:text-green-900 transition-colors duration-300">Home</Link></li>
      <li><Link to="/announces" className="hover:text-green-900 transition-colors duration-300">Announces</Link></li>
      <li><Link to="/blog" className="hover:text-green-900 transition-colors duration-300">Blog</Link></li>
      <li><Link to="/events" className="hover:text-green-900 transition-colors duration-300">Events</Link></li>
      <li><Link to="/about" className="hover:text-green-900 transition-colors duration-300">About</Link></li>
    </ul>
  </div>
  <div>
    <h2 className="text-xl font-semibold mb-4 text-green-800">Support</h2>
    <ul className="space-y-2">
      <li><Link to="/faq" className="hover:text-green-900 transition-colors duration-300">FAQs</Link></li>
      <li><Link to="/contact" className="hover:text-green-00 transition-colors duration-300">Contact Us</Link></li>
      <li><Link to="/accessibility" className="hover:text-green-900 transition-colors duration-300">Accessibility</Link></li>
      <li><Link to="/privacy-policy" className="hover:text-green-900 transition-colors duration-300">Privacy Policy</Link></li>
      <li><Link to="/terms" className="hover:text-green-900 transition-colors duration-300">Terms of Service</Link></li>
    </ul>
  </div>
</div>
        </div>
        <div className="mt-8 p-4 border-t border-green-700 text-center text-lg">
          <p>&copy; {new Date().getFullYear()} GreenConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer