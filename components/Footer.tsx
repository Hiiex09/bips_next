import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 mt-auto bg-slate-50 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="font-headline font-bold text-blue-900 text-lg">The Civic Sentinel</div>
          <p className="font-inter text-xs uppercase tracking-widest text-slate-500">
            © 2024 The Civic Sentinel. An Official Registry of the Republic.
          </p>
        </div>
        <div className="flex flex-wrap md:justify-end gap-x-8 gap-y-4">
          <Link 
            className="font-inter text-xs uppercase tracking-widest text-slate-500 hover:text-blue-700 transition-opacity" 
            href="#"
          >
            Privacy Policy
          </Link>
          <Link 
            className="font-inter text-xs uppercase tracking-widest text-slate-500 hover:text-blue-700 transition-opacity" 
            href="#"
          >
            Terms of Service
          </Link>
          <Link 
            className="font-inter text-xs uppercase tracking-widest text-slate-500 hover:text-blue-700 transition-opacity" 
            href="#"
          >
            Contact Support
          </Link>
          <Link 
            className="font-inter text-xs uppercase tracking-widest text-slate-500 hover:text-blue-700 transition-opacity" 
            href="#"
          >
            FOI Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
