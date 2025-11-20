import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentDetail() {
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [exams, setExams] = useState([]);
    const [average, setAverage] = useState(null);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [editExam, setEditExam] = useState(null);   // edit modal için exam objesi
    const [editScore, setEditScore] = useState("");   // score input


    useEffect(() => {
        api.get(`/students/${id}`)
            .then(res => setStudent(res.data))
            .catch(err => console.error(err));

        api.get(`/students/${id}/exams`)
            .then(res => setExams(res.data))
            .catch(err => console.error(err));
        api.get(`/students/${id}/average`)
            .then(res => setAverage(res.data))
            .catch(err => console.error(err));
        api.get(`/students/${id}/completed-courses`)
            .then(res => setCompletedCourses(res.data))
            .catch(err => console.error(err));

    }, [id]);

    const updateExam = async () => {
        try {
            await api.put(`/exams/${editExam.id}`, {
                student: { id: Number(id) },
                course: { id: editExam.course.id },
                score: Number(editScore)
            });

            // UI güncelle
            setExams(prev =>
                prev.map(ex =>
                    ex.id === editExam.id
                        ? { ...ex, score: Number(editScore) }
                        : ex
                )
            );

            setEditExam(null); // modal kapat
        } catch (err) {
            console.error(err);
            alert("Error updating exam.");
        }
    };


    const deleteExam = async (examId) => {
        if (!window.confirm("Delete this exam?")) return;

        try {
            await api.delete(`/exams/${examId}`);
            setExams(prev => prev.filter(e => e.id !== examId));  // UI güncelle
        } catch (err) {
            console.error(err);
            alert("Error deleting exam.");
        }
    };

    return (
        <div className="container mt-4">

            <Link to="/students" className="btn btn-link mb-3">
                ← Back to Students
            </Link>

            <h1>Student Detail</h1>

            {student && (
                <div className="card p-3 mb-4">
                    <h3>{student.fullName}</h3>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Number:</strong> {student.number}</p>
                    <p><strong>GSM:</strong> {student.gsmNumber}</p>
                </div>
            )}

            <Link to={`/students/${id}/add-exam`} className="btn btn-success mb-4">
                + Add Exam
            </Link>

            <div className="mb-4">
                <h3>Average Score</h3>
                {average === null ? (
                    <p>No completed courses yet.</p>
                ) : (
                    <p><strong>{Number(average).toFixed(2)}</strong></p>
                )}
            </div>

            <div className="mb-4">
                <h3>Completed Courses</h3>
                {completedCourses.length === 0 ? (
                    <p>No completed courses.</p>
                ) : (
                    <ul>
                        {completedCourses.map(c => (
                            <li key={c.id}>{c.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mb-4">
                <h3>Exam Results</h3>
                {exams.length === 0 ? (
                    <p>No exams found.</p>
                ) : (
                    <ul>
                        {exams.map(e => (
                            <li key={e.id}>
                                {e.course.name} — Score: {e.score}

                                {/* EDIT BUTTON */}
                                <Link
                                    className="btn btn-sm btn-warning ms-2"
                                    onClick={() => {
                                        setEditExam(e);
                                        setEditScore(e.score);
                                    }}
                                >
                                    Edit
                                </Link>

                                {/* DELETE BUTTON */}
                                <button
                                    className="btn btn-sm btn-danger ms-2"
                                    onClick={() => deleteExam(e.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {editExam && (
                <div
                    className="modal-backdrop"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 999
                    }}
                >
                    <div
                        className="modal-content p-4"
                        style={{
                            background: "white",
                            borderRadius: "10px",
                            width: "400px"
                        }}
                    >
                        <h4>Edit Exam</h4>
                        <p><strong>Course:</strong> {editExam.course.name}</p>

                        <label className="form-label">Score</label>
                        <input
                            type="number"
                            className="form-control mb-3"
                            value={editScore}
                            min="0"
                            max="100"
                            onChange={(e) => setEditScore(e.target.value)}
                        />

                        <button
                            className="btn btn-primary me-2"
                            onClick={updateExam}
                        >
                            Save
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => setEditExam(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>

    );
}
