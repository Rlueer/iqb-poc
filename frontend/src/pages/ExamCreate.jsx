import {useParams, useNavigate, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ExamCreate() {
    const { id } = useParams();         // student id
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [score, setScore] = useState("");
    const [student, setStudent] = useState(null);


    // Courses yükle
    useEffect(() => {
        api.get("/courses")
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
        api.get(`/students/${id}`)
            .then(res => setStudent(res.data))
            .catch(err => console.error(err));

    }, []);

    const submitExam = async (e) => {
        e.preventDefault();


        try {
            await api.post("/exams", {
                student: { id: Number(id) },
                course: { id: Number(courseId) },
                score: Number(score),
            });
            alert("Exam added!");
            navigate(`/students/${id}`);
        } catch (err) {
            console.error(err);
            alert("Error adding exam.");
        }

    };

    return (
        <div className="container mt-4">
            <Link to={`/students/${id}`} className="btn btn-link">
                ← Back to Student info
            </Link>
            <h2>Add Exam for {student ? student.fullName : `Student #${id}`}</h2>

            <form onSubmit={submitExam} className="mt-3">

                <div className="mb-3">
                    <label className="form-label">Course</label>
                    <select
                        className="form-control"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                    >
                        <option value="">Select course</option>
                        {courses.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Score</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        className="form-control"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Add Exam
                </button>
            </form>
        </div>
    );
}
