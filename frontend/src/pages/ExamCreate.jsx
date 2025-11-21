import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ExamCreate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [score, setScore] = useState("");
    const [student, setStudent] = useState(null);
    const [existingExams, setExistingExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get("/courses").then(res => setCourses(res.data)),
            api.get(`/students/${id}`).then(res => setStudent(res.data)),
            api.get(`/students/${id}/exams`).then(res => setExistingExams(res.data))
        ]).finally(() => setLoading(false));
    }, [id]);

    const examsForSelectedCourse = existingExams.filter((e) => e.course.id === Number(courseId));

    const submitExam = async (e) => {
        e.preventDefault();
        if (examsForSelectedCourse.length >= 3) {
            alert("This student already has 3 exam results for this course.");
            return;
        }
        try {
            await api.post("/exams", {
                studentId: Number(id),
                courseId: Number(courseId),
                score: Number(score)
            });
            alert("Exam added!");
            navigate(`/students/${id}`);
        } catch (err) {
            console.error(err);
            alert("Error adding exam.");
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="text-center text-white">
                    <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 py-5 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container-fluid px-4 px-md-5">
                <div className="row justify-content-center">
                    <div style={{ width: "100%", maxWidth: "600px" }}>

                        <Link to={`/students/${id}`} className="btn btn-light btn-sm mb-4 shadow-sm" style={{ borderRadius: '8px', fontWeight: 600 }}>
                            <i className="bi bi-arrow-left me-2"></i> Back to Student Info
                        </Link>

                        <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">
                                    <div className="d-inline-flex align-items-center justify-content-center mb-3"
                                         style={{ width: '70px', height: '70px', borderRadius: '18px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                        <span style={{ fontSize: '2rem' }}>📝</span>
                                    </div>
                                    <h2 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>Add Exam</h2>
                                    <p className="text-muted mb-0">
                                        for <strong style={{ color: '#667eea' }}>{student ? student.fullName : `Student #${id}`}</strong>
                                    </p>
                                </div>

                                {/* Student Info Badge */}
                                {student && (
                                    <div className="p-3 rounded-3 mb-4" style={{ background: '#f8f9fa' }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center justify-content-center"
                                                 style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold' }}>
                                                {student.fullName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="fw-semibold" style={{ color: '#1a1a2e' }}>{student.fullName}</div>
                                                <small className="text-muted">#{student.number}</small>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={submitExam}>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold" style={{ color: '#2c3e50' }}>
                                            <i className="bi bi-book me-2" style={{ color: '#667eea' }}></i>Course
                                        </label>
                                        <select className="form-select form-select-lg" value={courseId} onChange={(e) => setCourseId(e.target.value)} required
                                                style={{ border: '2px solid #e9ecef', borderRadius: '12px', padding: '0.75rem 1rem' }}>
                                            <option value="">Select a course</option>
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                        {courseId && examsForSelectedCourse.length > 0 && (
                                            <small className="text-muted mt-2 d-block">
                                                <i className="bi bi-info-circle me-1"></i>
                                                {examsForSelectedCourse.length}/3 exams recorded for this course
                                            </small>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold" style={{ color: '#2c3e50' }}>
                                            <i className="bi bi-percent me-2" style={{ color: '#667eea' }}></i>Score
                                        </label>
                                        <input type="number" min="0" max="100" className="form-control form-control-lg" value={score}
                                               onChange={(e) => setScore(e.target.value)} placeholder="Enter score (0-100)" required
                                               style={{ border: '2px solid #e9ecef', borderRadius: '12px', padding: '0.75rem 1rem' }} />
                                    </div>

                                    <button className="btn w-100 py-3" type="submit"
                                            disabled={examsForSelectedCourse.length >= 3}
                                            style={{
                                                borderRadius: '12px', fontWeight: 600, fontSize: '1.05rem', border: 'none',
                                                background: examsForSelectedCourse.length >= 3 ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white'
                                            }}>
                                        <i className="bi bi-plus-lg me-2"></i> Add Exam
                                    </button>

                                    {examsForSelectedCourse.length >= 3 && (
                                        <div className="alert alert-warning mt-3 mb-0" style={{ borderRadius: '12px' }}>
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            Maximum 3 exams allowed per course
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}