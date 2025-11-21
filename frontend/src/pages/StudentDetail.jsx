import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [exams, setExams] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [editExam, setEditExam] = useState(null);
    const [editScore, setEditScore] = useState("");
    const [courseAverages, setCourseAverages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get(`/students/${id}`).then(res => setStudent(res.data)),
            api.get(`/students/${id}/exams`).then(res => setExams(res.data)),
            api.get(`/students/${id}/completed-courses`).then(res => setCompletedCourses(res.data)),
            api.get(`/students/${id}/course-averages`).then(res => setCourseAverages(res.data))
        ]).finally(() => setLoading(false));
    }, [id]);

    const updateExam = async () => {
        try {
            await api.put(`/exams/${editExam.id}`, {
                student: { id: Number(id) },
                course: { id: editExam.course.id },
                score: Number(editScore)
            });
            setExams(prev => prev.map(ex => ex.id === editExam.id ? { ...ex, score: Number(editScore) } : ex));
            setEditExam(null);
        } catch (err) {
            console.error(err);
            alert("Error updating exam.");
        }
    };

    const deleteExam = async (examId) => {
        if (!window.confirm("Delete this exam?")) return;
        try {
            await api.delete(`/exams/${examId}`);
            setExams(prev => prev.filter(e => e.id !== examId));
        } catch (err) {
            console.error(err);
            alert("Error deleting exam.");
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="text-center text-white">
                    <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading student details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid px-4 px-md-5">

                {/* Back Button */}
                <Link to="/students" className="btn btn-light btn-sm mb-4 shadow-sm" style={{ borderRadius: '8px', fontWeight: 600 }}>
                    <i className="bi bi-arrow-left me-2"></i> Back to Students
                </Link>

                {/* Student Info Card */}
                {student && (
                    <div className="card border-0 shadow-lg mb-4" style={{ borderRadius: '16px' }}>
                        <div className="card-body p-4 p-md-5">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                                <div className="d-flex align-items-center gap-4">
                                    <div className="d-flex align-items-center justify-content-center"
                                         style={{
                                             width: '80px', height: '80px', borderRadius: '20px',
                                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                             fontSize: '2.5rem'
                                         }}>
                                        👤
                                    </div>
                                    <div>
                                        <h2 className="fw-bold mb-2" style={{ color: '#1a1a2e' }}>{student.fullName}</h2>
                                        <span className="badge" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                            #{student.number}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/students/${id}/add-exam`} className="btn shadow px-4 py-2"
                                      style={{ borderRadius: '12px', fontWeight: 600, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                                    <i className="bi bi-plus-lg me-2"></i> Add Exam
                                </Link>
                            </div>

                            <hr className="my-4" />

                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                                        <small className="text-muted d-block mb-1"><i className="bi bi-envelope me-2"></i>Email</small>
                                        <span className="fw-semibold" style={{ color: '#1a1a2e' }}>{student.email}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                                        <small className="text-muted d-block mb-1"><i className="bi bi-phone me-2"></i>GSM</small>
                                        <span className="fw-semibold" style={{ color: '#1a1a2e' }}>{student.gsmNumber}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                                        <small className="text-muted d-block mb-1"><i className="bi bi-hash me-2"></i>Student Number</small>
                                        <span className="fw-semibold" style={{ color: '#1a1a2e' }}>{student.number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cards Row */}
                <div className="row g-4">
                    {/* Completed Courses */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '16px' }}>
                            <div className="card-header bg-white border-0 p-4" style={{ borderRadius: '16px 16px 0 0' }}>
                                <h5 className="fw-bold mb-0" style={{ color: '#1a1a2e' }}>
                                    <span className="me-2">🎓</span> Completed Courses
                                </h5>
                            </div>
                            <div className="card-body p-4 pt-0">
                                {completedCourses.length === 0 ? (
                                    <div className="text-center py-4">
                                        <div style={{ fontSize: '3rem' }}>📭</div>
                                        <p className="text-muted mt-2 mb-0">No completed courses yet</p>
                                    </div>
                                ) : (
                                    <div className="list-group list-group-flush">
                                        {completedCourses.map(c => (
                                            <div key={c.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center border-0 border-bottom">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center justify-content-center"
                                                         style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0e7ff' }}>
                                                        📖
                                                    </div>
                                                    <span className="fw-semibold" style={{ color: '#1a1a2e' }}>{c.name}</span>
                                                </div>
                                                <span className="badge" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '0.5rem 0.75rem' }}>
                                                    Avg: {Number(courseAverages[c.id]).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Exam Results */}
                    {/* Exam Results */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '16px' }}>
                            <div className="card-header bg-white border-0 p-4" style={{ borderRadius: '16px 16px 0 0' }}>
                                <h5 className="fw-bold mb-0" style={{ color: '#1a1a2e' }}>
                                    <span className="me-2">📝</span> Exam Results
                                </h5>
                            </div>

                            <div className="card-body p-4 pt-0">
                                {exams.length === 0 ? (
                                    <div className="text-center py-4">
                                        <div style={{ fontSize: '3rem' }}>📭</div>
                                        <p className="text-muted mt-2 mb-0">No exams found</p>
                                    </div>
                                ) : (
                                    <div className="list-group list-group-flush">

                                        {(() => {
                                            const counters = {}; // ders bazlı sayaç

                                            return exams.map((e) => {
                                                // bu ders için sayaç yoksa başlat
                                                if (!counters[e.course.id]) counters[e.course.id] = 1;

                                                // bu sınavın numarası
                                                const order = counters[e.course.id];

                                                // sonraki için artır
                                                counters[e.course.id]++;

                                                return (
                                                    <div
                                                        key={e.id}
                                                        className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center border-0 border-bottom"
                                                    >
                                                        <div>
                                                            <div className="fw-semibold" style={{ color: '#1a1a2e' }}>
                                                                {order}. {e.course.name}
                                                            </div>
                                                            <small className="text-muted">
                                                                Score: <strong style={{ color: '#667eea' }}>{e.score}</strong>
                                                            </small>
                                                        </div>

                                                        <div>
                                                            <button
                                                                className="btn btn-sm btn-warning me-2"
                                                                onClick={() => {
                                                                    setEditExam(e);
                                                                    setEditScore(e.score);
                                                                }}
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => deleteExam(e.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            });
                                        })()}

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {editExam && (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
                        <div className="card border-0 shadow-lg" style={{ width: "420px", borderRadius: "20px" }}>
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="d-inline-flex align-items-center justify-content-center mb-3"
                                         style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                        <span style={{ fontSize: '1.5rem' }}>✏️</span>
                                    </div>
                                    <h4 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>Edit Exam</h4>
                                    <p className="text-muted mb-0">{editExam.course.name}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Score</label>
                                    <input type="number" className="form-control form-control-lg" value={editScore} min="0" max="100"
                                           onChange={(e) => setEditScore(e.target.value)}
                                           style={{ border: '2px solid #e9ecef', borderRadius: '12px' }} />
                                </div>
                                <div className="d-flex gap-3">
                                    <button className="btn flex-grow-1 py-2" onClick={updateExam}
                                            style={{ borderRadius: '12px', fontWeight: 600, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                                        Save Changes
                                    </button>
                                    <button className="btn btn-light py-2 px-4" onClick={() => setEditExam(null)}
                                            style={{ borderRadius: '12px', fontWeight: 600 }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}