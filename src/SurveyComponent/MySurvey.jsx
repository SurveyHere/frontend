import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from "chart.js";
import {
    FiBarChart2,
    FiTrash2,
    FiArrowLeft,
    FiPieChart,
    FiUsers,
    FiInbox
} from "react-icons/fi"; // ✅ Better looking icons
import ScrollToTop from "../HomeComponent/Scroll-top";
const API = import.meta.env.VITE_API_URL;


Chart.register(
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

export default function MySurvey() {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [chartType, setChartType] = useState("pie");
    const [loading, setLoading] = useState(true); // ✅ Add loading state

    const colors = [
        "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
        "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16",
        "#f97316", "#14b8a6"
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(`${API}/api/survey/mysurvey`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                const cleaned = res.data.map(item => item[0] || item);
                setSurveys(cleaned);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response?.data);
                setLoading(false);
            });
    }, []);

    const deleteSurvey = (id) => {
        const token = localStorage.getItem("token");

        swal({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            buttons: ["Cancel", "Yes, Delete It"],
            dangerMode: true,
        }).then(async (ok) => {
            if (!ok) return;

            try {
                await axios.delete(`${API}/api/survey/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setSurveys(prev => prev.filter(s => s._id !== id));
                swal("Deleted!", "Survey has been removed.", "success");
            } catch (err) {
                swal("Error", "Could not delete survey", "error");
            }
        });
    };

    const getChartData = (q) => {
        let labels = [];
        let data = [];

        if (Array.isArray(q.options)) {
            labels = q.options.map(o => o.text);
            data = q.options.map(o => o.count || 0);
        } else {
            const keys = Object.keys(q.options);
            labels = keys.map(k => Object.values(q.options[k])[0]);
            data = keys.map(k => Object.values(q.options[k])[1] || 0);
        }

        const total = data.reduce((a, b) => a + b, 0);
        const percentageLabels = labels.map((l, i) => {
            const percent = total ? ((data[i] / total) * 100).toFixed(1) : 0;
            return `${l} (${percent}%)`;
        });

        return {
            labels: percentageLabels,
            datasets: [{
                label: 'Responses',
                data,
                backgroundColor: colors.slice(0, data.length),
                borderWidth: 0, // ✅ Borderless charts look cleaner
                hoverOffset: 10 // ✅ Smooth hover effect
            }],
            total,
            maxIndex: data.indexOf(Math.max(...data))
        };
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
            <ScrollToTop />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                    My <span className="text-indigo-600">Surveys</span>
                </h1>
                <br/>
                {!selectedSurvey ? (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                                    Analytics Dashboard
                                </h1>
                                <p className="text-slate-500 mt-2">Manage and track your active surveys</p>
                            </div>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
                                <FiInbox className="text-blue-500" />
                                <span className="font-semibold">{surveys.length} Total Surveys</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : surveys.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {surveys.map((s, i) => (
                                    <div
                                        key={i}
                                        className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                        style={{ transitionDelay: `${i * 50}ms` }} // Staggered loading feel
                                    >
                                        <div className="p-6">
                                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                                                <FiBarChart2 className="text-blue-600 group-hover:text-white text-xl" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-1 truncate">
                                                {s?.surveyTopic}
                                            </h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <FiUsers /> {(s?.questions || []).length} Questions
                                            </p>
                                        </div>

                                        <div className="flex border-t border-slate-100 mt-auto">
                                            <button
                                                onClick={() => setSelectedSurvey(s)}
                                                className="flex-1 py-4 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                View Insights
                                            </button>
                                            <button
                                                onClick={() => deleteSurvey(s._id)}
                                                className="px-6 py-4 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors border-l border-slate-100"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                                <FiInbox className="mx-auto text-4xl text-slate-300 mb-4" />
                                <p className="text-slate-500">No surveys found. Start by creating one!</p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mb-8">
                            <button
                                onClick={() => setSelectedSurvey(null)}
                                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 group"
                            >
                                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                            </button>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Analysis Mode</span>
                                    <h2 className="text-3xl font-black text-slate-900 mt-2">
                                        {selectedSurvey?.surveyTopic}
                                    </h2>
                                </div>

                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setChartType("pie")}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${chartType === 'pie' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <FiPieChart /> Pie Chart
                                    </button>
                                    <button
                                        onClick={() => setChartType("bar")}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${chartType === 'bar' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <FiBarChart2 /> Bar Chart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {(selectedSurvey?.questions || []).map((q, i) => {
                                const chart = getChartData(q);
                                const isEmpty = chart.total === 0;

                                return (
                                    <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
                                        <div className="mb-6">
                                            <span className="text-blue-600 font-bold text-sm">QUESTION {i + 1}</span>
                                            <h4 className="text-xl font-bold text-slate-800 mt-1 leading-tight">
                                                {q.question}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
                                                <FiUsers /> {chart.total} Responses
                                            </div>
                                        </div>

                                        <div className="flex-grow flex items-center justify-center min-h-[300px]">
                                            {isEmpty ? (
                                                <div className="text-center">
                                                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <FiInbox className="text-slate-300 text-2xl" />
                                                    </div>
                                                    <p className="text-slate-400 italic">No responses yet</p>
                                                </div>
                                            ) : (
                                                <div className="w-full max-w-[400px]">
                                                    {chartType === "pie" ? (
                                                        <Pie
                                                            data={chart}
                                                            options={{ plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '500' } } } } }}
                                                        />
                                                    ) : (
                                                        <Bar
                                                            data={chart}
                                                            options={{
                                                                plugins: { legend: { display: false } },
                                                                scales: {
                                                                    y: { beginAtZero: true, grid: { display: false }, ticks: { font: { size: 12 } } },
                                                                    x: { grid: { display: false }, ticks: { font: { size: 12 } } }
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {!isEmpty && (
                                            <div className="mt-8 pt-6 border-t border-slate-100">
                                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
                                                    <span className="text-emerald-700 font-bold text-sm">Most Selected Option:</span>
                                                    <span className="text-emerald-800 font-black">{chart.labels[chart.maxIndex].split(' (')[0]}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}