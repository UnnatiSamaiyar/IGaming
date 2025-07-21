
import { FiChevronRight, FiMap } from 'react-icons/fi';

const CTASection = () => {


  return (
    <div className="relative overflow-hidden bg-gray-900 rounded-2xl px-8 py-12 shadow-xl">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-indigo-400 mb-6">
          <FiMap className="mr-1.5" />  Countries Mapped
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-4">
          Country Compliance Guide
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          SMS laws and iGaming rules vary by country. We’ve mapped it all out — so you don’t have to.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="/menu">
          <button
            
            className="group relative flex items-center justify-center px-8 py-4 hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Explore Regulations
            <FiChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          </a>

          <div className="text-sm text-gray-400 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            Updated weekly with regulatory changes
          </div>
        </div>
      </div>

      {/* Floating country indicators - decorative only */}
      <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-indigo-800/20 blur-xl"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-800/20 blur-xl"></div>
    </div>
  );
};

export default CTASection;
