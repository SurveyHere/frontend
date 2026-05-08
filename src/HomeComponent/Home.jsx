import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const API = import.meta.env.VITE_API_URL;

// Symmetrical, minimalist icons
const BuilderIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);
const TargetIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const AnalyticsIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
);

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col items-center overflow-x-hidden">

            <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">

                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="w-full pt-32 pb-24 flex flex-col items-center text-center"
                >
                    <motion.div variants={fadeInUp} className="mb-8 px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        Smart Survey Platform
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-950 mb-8 max-w-5xl leading-[1.05]"
                    >
                        Transform Feedback <br />
                        Into <span className="text-blue-600">Action.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed"
                    >
                        Build professional surveys, collect meaningful responses, and make confident decisions using a beautifully intuitive platform.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/create-survey')}
                            className="w-full sm:w-[220px] h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center"
                        >
                            Start Creating
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/Surveys')}
                            className="w-full sm:w-[220px] h-14 bg-white border border-slate-200 text-slate-900 font-semibold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center"
                        >
                            Browse Surveys
                        </motion.button>
                    </motion.div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="w-full py-24"
                >
                    <div className="text-center mb-20 flex flex-col items-center">
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">Everything you need.</motion.h2>
                        <motion.p variants={fadeInUp} className="text-slate-500 text-lg max-w-md">Powerful features designed to help you gather and analyze data effectively.</motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {[
                            { icon: <BuilderIcon />, title: "Custom Builder", desc: "Design tailored surveys with advanced customization options." },
                            { icon: <TargetIcon />, title: "Targeted Distribution", desc: "Reach the right audience with precision targeting tools." },
                            { icon: <AnalyticsIcon />, title: "Deep Analytics", desc: "Gain actionable insights through real-time reporting." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all cursor-default"
                            >
                                <div className="w-12 h-12 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full py-24"
                >
                    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2.5rem] p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden border border-blue-100 shadow-lg">

                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-200 blur-[100px] rounded-full pointer-events-none"
                        ></motion.div>

                        <h2 className="text-gray-900 text-4xl md:text-5xl font-bold mb-6 relative z-10">
                            Want to share your opinion?
                        </h2>

                        <p className="text-gray-600 text-lg mb-10 max-w-xl leading-relaxed relative z-10">
                            Participate in surveys created by others and contribute to valuable insights.
                            Help shape decisions and make your voice heard.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/surveys')}
                            className="relative z-10 w-[220px] h-14 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-md"
                        >
                            Participate Now
                        </motion.button>
                    </div>
                </motion.section>

                <footer className="w-full py-12 border-t border-slate-100 flex flex-col items-center text-center">
                    <p className="text-slate-500 mb-2 font-medium">
                        © 2026 Survey Here. Built for professionals.
                    </p>
                </footer>
            </div>
        </div>
    );
}