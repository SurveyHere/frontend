import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Send, Layout, MessageSquare, PlusCircle, Eye, Settings, List } from "lucide-react";
const API = import.meta.env.VITE_API_URL;


export default function CreateSurvey() {
    const [surveyTopic, setSurveyTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [questions, setQuestions] = useState([]);
    const [loguser, setloguser] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedUser");
        if (storedUser) {
            const log = JSON.parse(storedUser);
            setloguser(log.username);
        }
    }, []);

    const addOption = () => setOptions([...options, ""]);

    const removeOption = (index) => {
        if (options.length > 2) {
            const updated = options.filter((_, i) => i !== index);
            setOptions(updated);
        }
    };

    const handleOptionChange = (value, index) => {
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter' && index === options.length - 1) {
            e.preventDefault();
            addOption();
        }
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        if (!question.trim() || options.some(opt => !opt.trim())) {
            swal("Wait!", "Please fill in the question and all options.", "info");
            return;
        }

        const formattedOptions = options.map(opt => ({
            text: opt,
            count: 0
        }));

        setQuestions([
            ...questions,
            { question, options: formattedOptions }
        ]);

        setQuestion("");
        setOptions(["", ""]);
    };

    const removeQuestion = (index) => {
        swal({
            title: "Remove question?",
            text: "This action cannot be undone",
            icon: "warning",
            buttons: ["Cancel", "Remove"],
            dangerMode: true
        }).then((ok) => {
            if (ok) {
                setQuestions(prev => prev.filter((_, i) => i !== index));
            }
        });
    };

    const handleSubmit = () => {
        if (!surveyTopic.trim() || questions.length === 0) {
            swal("Hold on", "Give your survey a title and at least one question.", "warning");
            return;
        }

        const token = localStorage.getItem("token");
        axios.post(
            `${API}/api/survey/create`,
            { surveyTopic, questions },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(() => {
                swal("Published!", "Your survey is now live.", "success");
                setSurveyTopic("");
                setQuestions([]);
            })
            .catch((error) => {
                swal("Error", error.response?.data?.msg || "Something went wrong", "error");
            });
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-10 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Create <span className="text-indigo-600">New Survey</span>
                    </h1>
                    <p className="mt-2 text-slate-600 italic">Signed in as: <span className="font-bold text-indigo-500">{loguser || 'Guest'}</span></p>
                </header>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">

]                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">

]                        <div className="bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-3xl overflow-hidden flex flex-col">

                            <div className="bg-slate-100/50 border-b border-slate-200 px-8 py-3 flex items-center gap-3">
                                <Settings size={20} className="text-indigo-500" />
                                <h2 className="font-bold text-slate-700 tracking-wide">Survey Builder</h2>
                            </div>

]                            <div className="p-8 flex flex-col flex-grow">

                                <div className="mb-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                                        <Layout size={16} /> Survey Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Employee Satisfaction 2026"
                                        className="w-full bg-white border-slate-200 border-2 p-4 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                                        value={surveyTopic}
                                        onChange={(e) => setSurveyTopic(e.target.value)}
                                    />
                                </div>

                                <hr className="border-slate-100 mb-8" />

                                <div className="flex flex-col mb-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                                        <MessageSquare size={16} /> Add Question
                                    </label>
                                    <textarea
                                        placeholder="What would you like to ask?"
                                        className="w-full bg-white border-slate-200 border-2 p-4 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all min-h-[100px] resize-none"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col flex-grow">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                                        <List size={16} /> Options
                                    </label>

                                    <div className="space-y-4 mb-2">
                                        <AnimatePresence mode="popLayout">
                                            {options.map((opt, index) => (
                                                <motion.div key={index} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder={`Option ${index + 1}`}
                                                        className="flex-1 bg-white border-slate-200 border-2 p-3.5 rounded-xl focus:border-indigo-400 outline-none shadow-sm transition-all"
                                                        value={opt}
                                                        onChange={(e) => handleOptionChange(e.target.value, index)}
                                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                                    />
                                                    {options.length > 2 && (
                                                        <button onClick={() => removeOption(index)} className="p-3.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border-2 border-transparent hover:border-red-100">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border-t border-slate-200 px-8 py-5 flex justify-between items-center mt-auto">
                                <button onClick={addOption} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors bg-indigo-100/50 hover:bg-indigo-100 px-4 py-2 rounded-lg">
                                    <Plus size={20} /> Add Option
                                </button>

                                <button onClick={handleAddQuestion} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                                    <PlusCircle size={20} /> Add to List
                                </button>
                            </div>
                        </div>
                    </motion.div>

]                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                        <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col ">

                            <div className="bg-slate-900 px-6 py-5 flex justify-between items-center text-white">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="ml-4 text-[10px] font-mono opacity-50 uppercase tracking-widest flex items-center gap-2">
                                        <Eye size={12} /> Live Preview
                                    </span>
                                </div>
                                {questions.length > 0 && (
                                    <span className="text-xs bg-indigo-500/30 border border-indigo-500/50 px-3 py-1 rounded-full font-bold">
                                        {questions.length} {questions.length === 1 ? "Question" : "Questions"}
                                    </span>
                                )}
                            </div>

]                            <div className="p-8 flex-grow bg-slate-50/50">
                                <div className="mb-10 border-b border-slate-200/60 pb-6">
                                    {surveyTopic ? (
                                        <h3 className="text-4xl font-black text-slate-900 leading-tight break-words">
                                            {surveyTopic}
                                        </h3>
                                    ) : (
                                        <h3 className="text-4xl font-black text-slate-300 italic">
                                            Untitled Survey
                                        </h3>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <AnimatePresence mode="popLayout">
                                        {questions.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="h-64 flex flex-col items-center justify-center text-slate-400 border-4 border-dashed border-slate-200 rounded-3xl bg-white"
                                            >
                                                <div className="bg-slate-100 p-4 rounded-full mb-4">
                                                    <MessageSquare size={32} className="opacity-40 text-slate-500" />
                                                </div>
                                                <p className="font-medium">No questions added yet.</p>
                                                <p className="text-sm opacity-70 mt-1">Use the builder on the left to begin.</p>
                                            </motion.div>
                                        ) : (
                                            questions.map((q, index) => (
                                                <motion.div
                                                    key={index}
                                                    layout
                                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="group bg-white border border-slate-200 p-6 rounded-2xl transition-all relative hover:shadow-lg hover:border-indigo-200"
                                                >
                                                    <button
                                                        onClick={() => removeQuestion(index)}
                                                        className="absolute -top-3 -right-3 bg-white text-slate-400 hover:text-red-500 shadow-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all border border-slate-100 hover:border-red-100 hover:bg-red-50 z-10"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                    <div className="flex gap-4">
                                                        <span className="flex-shrink-0 w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm border border-indigo-100">
                                                            {index + 1}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-lg font-bold text-slate-800 mb-4 break-words">
                                                                {q.question}
                                                            </p>

                                                            <div className="grid grid-cols-1 gap-3">
                                                                {q.options.map((opt, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm font-medium transition-colors hover:bg-slate-100 break-words"
                                                                    >
                                                                        <div className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-slate-300 bg-white"></div>
                                                                        <span>{opt.text}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="p-6 bg-white border-t border-slate-100 mt-auto">
                                {questions.length > 0 ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                                    >
                                        <Send size={20} />
                                        Publish Survey
                                    </button>
                                ) : (
                                    <div className="text-center text-slate-400 text-sm font-medium py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        Design your survey to enable publishing
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}