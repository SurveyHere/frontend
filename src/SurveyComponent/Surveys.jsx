import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ScrollToTop from "../HomeComponent/Scroll-top";

const CheckIcon = () => (
    <svg className="w-5 h-5 ml-2 inline text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

export default function Surveys() {
    const [showSurvey, setSurvey] = useState(true);
    const [Questions, setQuestions] = useState([]);
    const [quest, setQuest] = useState(null);
    const [Opt, setOpt] = useState([]);
    const [visibleQuestions, setVisibleQuestions] = useState(1);
    const [nosurvey, setnosurvey] = useState(false);

    const questionRefs = useRef([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/survey/all")
            .then((res) => {
                const cleaned = (res.data || []).map(s => Array.isArray(s) ? s[0] : s);
                setQuestions(cleaned);
                setnosurvey(cleaned.length === 0);
            })
            .catch((err) => {
                console.error(err);
                setnosurvey(true);
            });
    }, []);

    const handleOptionSelect = (questionIndex, optionIndex) => {
        const updated = [...Opt];
        updated[questionIndex] = optionIndex;
        setOpt(updated);

        setTimeout(() => {
            setVisibleQuestions(prev => Math.min(prev + 1, (quest?.questions || []).length));
            if (questionRefs.current[questionIndex + 1]) {
                questionRefs.current[questionIndex + 1].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }, 300);
    };

    const Submit = async () => {
        const totalQuestions = (quest?.questions || []).length;
        if (Opt.length !== totalQuestions) {
            alert("Please answer all questions.");
            return;
        }

        try {
            await axios.post(`http://localhost:3001/api/survey/answer/${quest._id}`, { answers: Opt });
            alert("Survey submitted! Thank you.");
            setSurvey(true);
            setQuest(null);
            setOpt([]);
            setVisibleQuestions(1);
        } catch (err) {
            alert("Submission failed.");
        }
    };

    const Open = (survey) => {
        setSurvey(false);
        setQuest(survey);
        setOpt([]);
        setVisibleQuestions(1);
    };

    return (
        <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] text-slate-900 font-sans">
            <ScrollToTop />

            <div className="max-w-6xl mx-auto px-6 py-12">
                {showSurvey ? (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                        <header className="mb-12 border-b border-slate-200 pb-8 text-center md:text-left">
                            <h1 className="text-4xl font-black tracking-tight text-slate-900">
                                <span className="text-indigo-600">Surveys</span>
                            </h1>
                            <p className="text-slate-500 mt-2 text-lg">Help us improve by sharing your thoughts.</p>
                        </header>

                        {nosurvey ? (
                            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 text-xl font-medium">No active surveys found.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Questions.map((survey, i) => (
                                    <div
                                        key={survey?._id || i}
                                        className="group bg-white border border-slate-200 p-8 rounded-3xl hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
                                            {survey?.surveyTopic || "Untitled Survey"}
                                        </h3>
                                        <p className="text-sm font-semibold text-indigo-600 mb-6 uppercase tracking-wider">
                                            {(survey?.questions || []).length} Questions
                                        </p>
                                        <button
                                            onClick={() => Open(survey)}
                                            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg"
                                        >
                                            Take Survey
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
                        <button
                            onClick={() => setSurvey(true)}
                            className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
                        >
                            <span className="mr-2">←</span> Back to Surveys
                        </button>

                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">{quest?.surveyTopic}</h2>
                            <div className="h-2 w-full bg-slate-200 rounded-full">
                                <div
                                    className="h-full bg-indigo-600 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(79,70,229,0.4)]"
                                    style={{ width: `${(visibleQuestions / (quest?.questions || []).length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {(quest?.questions || []).map((q, index) => (
                            <div
                                key={index}
                                ref={(el) => (questionRefs.current[index] = el)}
                                className={`${index < visibleQuestions ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} transition-all duration-500 mb-8`}
                            >
                                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
                                    <div className="flex items-center mb-6">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold mr-3">
                                            {index + 1}
                                        </span>
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-tighter">Question</span>
                                    </div>
                                    <h3 className="text-xl text-slate-800 font-bold mb-8 leading-snug">
                                        {q?.question}
                                    </h3>

                                    <div className="grid gap-3">
                                        {(Array.isArray(q.options) ? q.options : Object.values(q.options || {}))
                                            .map((opt, i) => {
                                                const isSelected = Opt[index] === i;
                                                const label = opt?.text || Object.values(opt || {})[0] || "Option";

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleOptionSelect(index, i)}
                                                        className={`group flex items-center justify-between w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 
                                                        ${isSelected
                                                            ? "bg-indigo-50 border-indigo-600 ring-4 ring-indigo-50"
                                                            : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50"}`}
                                                    >
                                                        <span className={`text-lg ${isSelected ? "text-indigo-900 font-bold" : "text-slate-600 font-medium"}`}>
                                                            {label}
                                                        </span>
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                                            ${isSelected ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-300 group-hover:border-indigo-400"}`}>
                                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {visibleQuestions === (quest?.questions || []).length && Opt[visibleQuestions - 1] !== undefined && (
                            <button
                                onClick={Submit}
                                className="mt-12 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-black py-5 rounded-3xl transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98]"
                            >
                                Submit All Answers
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}