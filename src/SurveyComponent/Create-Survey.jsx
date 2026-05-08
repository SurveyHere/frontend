import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Trash2,
    Send,
    Layout,
    MessageSquare,
    PlusCircle,
    Eye,
    List,
} from "lucide-react";

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

    const addOption = () => {
        setOptions([...options, ""]);
    };

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
        if (e.key === "Enter" && index === options.length - 1) {
            e.preventDefault();
            addOption();
        }
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();

        if (!question.trim() || options.some((opt) => !opt.trim())) {
            swal(
                "Incomplete",
                "Please fill the question and all options.",
                "warning"
            );
            return;
        }

        const formattedOptions = options.map((opt) => ({
            text: opt,
            count: 0,
        }));

        setQuestions([
            ...questions,
            {
                question,
                options: formattedOptions,
            },
        ]);

        setQuestion("");
        setOptions(["", ""]);
    };

    const removeQuestion = (index) => {
        swal({
            title: "Delete Question?",
            text: "This cannot be undone.",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                setQuestions((prev) => prev.filter((_, i) => i !== index));
            }
        });
    };

    const handleSubmit = () => {
        if (!surveyTopic.trim() || questions.length === 0) {
            swal(
                "Missing Details",
                "Add survey title and at least one question.",
                "info"
            );
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .post(
                `${API}/api/survey/create`,
                {
                    surveyTopic,
                    questions,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                swal("Success", "Survey published successfully.", "success");

                setSurveyTopic("");
                setQuestions([]);
            })
            .catch((error) => {
                swal(
                    "Error",
                    error.response?.data?.msg || "Something went wrong",
                    "error"
                );
            });
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                        Create Survey
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Logged in as{" "}
                        <span className="font-semibold text-indigo-600">
              {loguser || "Guest"}
            </span>
                    </p>
                </div>

                {/* Main Layout */}

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* LEFT SIDE */}

                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col"
                    >
                        {/* Top */}

                        <div className="border-b border-slate-200 px-5 py-4 flex items-center gap-2">
                            <Layout className="text-indigo-600" size={20} />

                            <h2 className="font-semibold text-slate-700">
                                Survey Builder
                            </h2>
                        </div>

                        {/* Content */}

                        <div className="p-5 flex flex-col gap-6">
                            {/* Survey Title */}

                            <div>
                                <label className="text-sm font-medium text-slate-600 mb-2 block">
                                    Survey Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter survey title"
                                    value={surveyTopic}
                                    onChange={(e) => setSurveyTopic(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                />
                            </div>

                            {/* Question */}

                            <div>
                                <label className="text-sm font-medium text-slate-600 mb-2 block">
                                    Question
                                </label>

                                <textarea
                                    placeholder="Type your question..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full min-h-[110px] p-4 rounded-xl border border-slate-300 outline-none resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                />
                            </div>

                            {/* Options */}

                            <div>
                                <label className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-2">
                                    <List size={16} />
                                    Options
                                </label>

                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {options.map((opt, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder={`Option ${index + 1}`}
                                                    value={opt}
                                                    onChange={(e) =>
                                                        handleOptionChange(e.target.value, index)
                                                    }
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    className="flex-1 h-12 px-4 rounded-xl border border-slate-300 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                                                />

                                                {options.length > 2 && (
                                                    <button
                                                        onClick={() => removeOption(index)}
                                                        className="w-12 h-12 rounded-xl border border-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Buttons */}

                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={addOption}
                                        className="flex items-center gap-2 px-4 h-11 rounded-xl bg-slate-200 hover:bg-slate-300 transition font-medium text-slate-700"
                                    >
                                        <Plus size={18} />
                                        Add Option
                                    </button>

                                    <button
                                        onClick={handleAddQuestion}
                                        className="flex items-center gap-2 px-5 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition font-medium"
                                    >
                                        <PlusCircle size={18} />
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE */}

                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col"
                    >
                        {/* Top */}

                        <div className="border-b border-slate-200 px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye size={18} className="text-indigo-600" />

                                <h2 className="font-semibold text-slate-700">
                                    Live Preview
                                </h2>
                            </div>

                            {questions.length > 0 && (
                                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {questions.length} Questions
                </span>
                            )}
                        </div>

                        {/* Preview Content */}

                        <div className="p-5 flex-grow">
                            <div className="max-w-2xl mx-auto">
                                {/* Survey Title */}

                                <div className="mb-8">
                                    {surveyTopic ? (
                                        <h2 className="text-3xl font-bold text-slate-800 break-words">
                                            {surveyTopic}
                                        </h2>
                                    ) : (
                                        <h2 className="text-3xl font-bold text-slate-300 italic">
                                            Untitled Survey
                                        </h2>
                                    )}
                                </div>

                                {/* Questions */}

                                <div className="space-y-8">
                                    <AnimatePresence>
                                        {questions.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="h-64 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50"
                                            >
                                                <MessageSquare size={40} />

                                                <p className="mt-3 font-medium">
                                                    No Questions Added
                                                </p>

                                                <p className="text-sm mt-1">
                                                    Start creating your survey
                                                </p>
                                            </motion.div>
                                        ) : (
                                            questions.map((q, index) => (
                                                <motion.div
                                                    key={index}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="relative bg-slate-50 border border-slate-200 rounded-2xl p-5"
                                                >
                                                    {/* Delete */}

                                                    <button
                                                        onClick={() => removeQuestion(index)}
                                                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                    {/* Question */}

                                                    <div className="flex gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                                                            {index + 1}
                                                        </div>

                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-slate-800 mb-4 break-words">
                                                                {q.question}
                                                            </h3>

                                                            {/* Options */}

                                                            <div className="space-y-3">
                                                                {q.options.map((opt, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex items-center gap-3 border border-slate-200 bg-white rounded-xl px-4 py-3"
                                                                    >
                                                                        <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>

                                                                        <span className="text-slate-700">
                                      {opt.text}
                                    </span>
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
                        </div>

                        {/* Footer */}

                        <div className="border-t border-slate-200 p-5">
                            {questions.length > 0 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                                >
                                    <Send size={18} />
                                    Publish Survey
                                </button>
                            ) : (
                                <div className="h-12 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm">
                                    Add questions to publish your survey
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}