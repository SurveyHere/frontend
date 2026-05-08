import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL;
// import './Navbar.css'; // No longer needed with Tailwind

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const LogoIcon = () => (
    <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
);

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [login, setLogin] = useState("");

    useEffect(() => {
        const loggeduser = JSON.parse(localStorage.getItem("loggedUser"));
        console.log(loggeduser.username)
        if (loggeduser && loggeduser.username) {
            setLogin(loggeduser.username);
        }
    }, []);

    const linkClasses = ({ isActive }) =>
        isActive
            ? "text-white font-semibold bg-white/10 px-3 py-2 rounded-lg transition-all"
            : "text-slate-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all font-medium";

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0B0F19]/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <div className="flex-shrink-0 flex items-center gap-3">
                        <a href='/Home' className="flex items-center gap-2 group">
                            <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-slate-700 transition-colors">
                                <LogoIcon />
                            </div>
                            <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:from-purple-400 group-hover:to-indigo-400 transition-all">
                    SURVEY HERE
                </span>
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to='/Home' className={linkClasses}>Home</NavLink>
                            <NavLink to='/Create-Survey' className={linkClasses}>Create Survey</NavLink>
                            <NavLink to='/MySurvey' className={linkClasses}>My Survey</NavLink>
                            <NavLink to='/Survey' className={linkClasses}>Survey</NavLink>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700">
                            <div className="text-purple-400"><UserIcon /></div>
                            <span className="text-sm font-medium text-slate-200">{login || "Guest"}</span>
                        </div>
                        <NavLink
                            to='/'
                            className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                        >
                            Logout
                        </NavLink>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none transition-colors"
                        >
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-[#0B0F19] border-b border-slate-800 animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to='/Home' onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                            Home
                        </NavLink>
                        <NavLink to='/Create-Survey' onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                            Create Survey
                        </NavLink>
                        <NavLink to='/MySurvey' onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                            My Survey
                        </NavLink>
                        <NavLink to='/Survey' onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                            Survey
                        </NavLink>
                    </div>
                    <div className="pt-4 pb-4 border-t border-slate-800">
                        <div className="flex items-center px-5 mb-3">
                            <div className="flex-shrink-0 bg-slate-700 p-2 rounded-full">
                                <UserIcon />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">{login}</div>
                                <div className="text-sm font-medium leading-none text-slate-400 mt-1">Logged in</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2">
                            <NavLink to='/' onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-colors">
                                Sign out
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}