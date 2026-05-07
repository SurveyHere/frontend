import React from 'react';
import { Link } from 'react-router-dom';

const LogoIcon = () => (
    <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
);
const ChevronRight = () => (
    <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);
const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.36-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.361-2.618-6.782-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const YoutubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

export default function Footer() {
    return (
        <footer className="bg-[#0B0F19] !text-slate-300 border-t border-slate-800 relative font-sans">

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-900/10 rounded-full blur-[80px]"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-900/10 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                                <LogoIcon />
                            </div>
                            <h2 className="text-2xl font-bold tracking-wider !text-white">SURVEY HERE</h2>
                        </div>
                        <p className="!text-slate-300 text-sm leading-relaxed max-w-xs">
                            Your Vision, Your Impact. Empowering you to make data-driven decisions through seamless feedback collection.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4 md:items-center md:pl-10">
                        <div className="w-full max-w-xs">
                            <h3 className="!text-white font-bold text-lg mb-6 border-b border-purple-500/50 inline-block pb-1">
                                Explore More
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to='/AboutUs' className="group flex items-center !text-slate-300 hover:!text-white transition-colors">
                                        <span className="group-hover:translate-x-1 transition-transform"><ChevronRight /></span>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/ContactUs' className="group flex items-center !text-slate-300 hover:!text-white transition-colors">
                                        <span className="group-hover:translate-x-1 transition-transform"><ChevronRight /></span>
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/TermsAndCondition' className="group flex items-center !text-slate-300 hover:!text-white transition-colors">
                                        <span className="group-hover:translate-x-1 transition-transform"><ChevronRight /></span>
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' className="group flex items-center !text-slate-300 hover:!text-red-400 transition-colors">
                                        <span className="group-hover:translate-x-1 transition-transform"><ChevronRight /></span>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <h3 className="!text-white font-bold text-lg mb-4">Follow Us On</h3>
                        <div className="flex items-center gap-4">
                            <a href='https://www.facebook.com/' target="_blank" rel="noreferrer" className="p-3 bg-slate-800 !text-slate-300 rounded-full hover:bg-[#1877F2] hover:!text-white transition-all transform hover:-translate-y-1 shadow-lg border border-slate-700">
                                <FacebookIcon />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" rel="noreferrer" className="p-3 bg-slate-800 !text-slate-300 rounded-full hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:!text-white transition-all transform hover:-translate-y-1 shadow-lg border border-slate-700">
                                <InstagramIcon />
                            </a>
                            <a href='https://x.com/' target="_blank" rel="noreferrer" className="p-3 bg-slate-800 !text-slate-300 rounded-full hover:bg-black hover:!text-white transition-all transform hover:-translate-y-1 shadow-lg border border-slate-700">
                                <TwitterIcon />
                            </a>
                            <a href='https://www.youtube.com/' target="_blank" rel="noreferrer" className="p-3 bg-slate-800 !text-slate-300 rounded-full hover:bg-[#FF0000] hover:!text-white transition-all transform hover:-translate-y-1 shadow-lg border border-slate-700">
                                <YoutubeIcon />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 text-center">
                    <p className="!text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} Survey Here. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}