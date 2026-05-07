import React from 'react'

export default function AboutUs() {
    const benefits = [
        {
            title: "Easy-to-Use Interface",
            desc: "Designed for everyone, from beginners to professionals. No technical knowledge required.",
            icon: "bi-layout-text-window"
        },
        {
            title: "Customizable Surveys",
            desc: "Tailor surveys with multiple question types, branding, and smart logic.",
            icon: "bi-palette"
        },
        {
            title: "Secure & Confidential",
            desc: "Data privacy is our priority. Encrypted responses and anonymous options included.",
            icon: "bi-shield-lock"
        },
        {
            title: "Real-Time Analytics",
            desc: "Instant insights with visual charts and exportable reports for deep analysis.",
            icon: "bi-graph-up-arrow"
        }
    ];

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                <header className="text-center mb-16">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        ABOUT US
                    </h1>
                    <div className="mt-2 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
                </header>

                <section className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 mb-10 border border-gray-100 transition-all hover:shadow-md">
                    <h3 className="text-indigo-900 text-lg font-bold mb-4 uppercase tracking-widest">Who We Are?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Welcome to <span className="text-indigo-600 font-bold uppercase">Survey Here</span>, an innovative online survey platform designed to make feedback collection effortless, insightful, and efficient.
                        We understand the power of data-driven decisions, and our goal is to provide individuals and organizations with a seamless way to create, distribute, and analyze surveys.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-md">
                        <h3 className="text-indigo-800 font-bold mb-4 uppercase tracking-widest">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We envision a world where collecting and acting on feedback is a fundamental driver of growth.
                            Our vision is to make feedback accessible to everyone, transforming raw survey data into meaningful insights.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-md">
                        <h3 className="text-indigo-800 font-bold mb-4 uppercase tracking-widest">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To provide an efficient, secure, and user-friendly platform that enables seamless data collection.
                            We empower users to use feedback to drive innovation and meaningful change.
                        </p>
                    </div>
                </div>

                <section className="mb-10">
                    <h3 className="text-center text-2xl font-bold text-slate-800 mb-10">Why Choose Us?</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start p-6 bg-white rounded-xl border border-gray-50 transition-all hover:border-indigo-100 hover:shadow-sm">
                                <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                                    <i className={`bi ${benefit.icon} text-indigo-600 text-xl`}></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{benefit.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1 leading-snug">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}