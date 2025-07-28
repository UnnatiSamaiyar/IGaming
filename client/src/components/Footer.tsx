import { Link } from "react-router-dom";
import IgmaingLogo from '../assets/Images/logo.png'

const Footer = () => {
  return (
    <footer className="bg-black text-white rounded-lg shadow-lg m-4">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Link to="/">
            <img
              src={IgmaingLogo}
              alt="Logo"
              width={200}
              height={60}
              className="h-12 py-1 w-auto object-contain"
            />
          </Link>

          <ul className="flex flex-wrap items-center mt-4 sm:mt-0 text-sm font-medium text-gray-400">
            <li>
              <Link to="/about" className="hover:text-cyan-400 transition duration-300 me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-cyan-400 transition duration-300 me-4 md:me-6">
                Services
              </Link>
            </li>
            <li>
              <Link to="/industry" className="hover:text-cyan-400 transition duration-300 me-4 md:me-6">
                Industry
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-400 transition duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex flex-col items-center">
          <span className="block text-sm text-gray-400">
            © {new Date().getFullYear()} IGaming. All Rights Reserved.
          </span>
          <div className="flex space-x-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.34-5 9.34-9.34 0-.142 0-.283-.01-.423A6.693 6.693 0 0 0 16 3.542a6.56 6.56 0 0 1-1.889.517 3.293 3.293 0 0 0 1.447-1.815 6.57 6.57 0 0 1-2.084.793A3.281 3.281 0 0 0 7.875 7.5a9.325 9.325 0 0 1-6.75-3.415 3.28 3.28 0 0 0 1.016 4.375A3.276 3.276 0 0 1 .64 8.1v.041a3.283 3.283 0 0 0 2.628 3.215 3.28 3.28 0 0 1-1.48.056 3.283 3.283 0 0 0 3.058 2.27A6.577 6.577 0 0 1 0 14.29a9.305 9.305 0 0 0 5.026 1.475" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.513 0 1.146 0h13.708C15.487 0 16 .513 16 1.146v13.708C16 15.487 15.487 16 14.854 16H1.146C.513 16 0 15.487 0 14.854V1.146zM4.5 14.5h-2V6h2v8.5zm-1-9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10.5 9.5h-2v-4.5c0-1.074-.021-2.45-1.5-2.45-1.5 0-1.75 1.125-1.75 2.25V14.5h-2V6h2v1.125c.25-.5 1.125-1.125 2.25-1.125 2.5 0 2.5 2.5 2.5 3.75V14.5z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8 4.42 0 8-3.58 8-8 0-4.42-3.58-8-8-8zm1.5 8.5h-1v5h-2v-5H5V8h1.5V6.5c0-1.5.5-2.5 2-2.5h1.5v2H9c-.5 0-.5.5-.5 1V8.5h1.5l-.5 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
