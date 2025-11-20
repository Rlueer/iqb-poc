import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        api.get(`/courses/${id}`).then(res => setCourse(res.data));
        api.get(`/courses/${id}/students`).then(res => setStudents(res.data));
    }, [id]);

    return (
        <div className="container mt-4">
            <Link className="btn btn-link" to="/courses">
                ← Back to Courses
            </Link>

            {course && <h2>Course: {course.name}</h2>}

            <h3 className="mt-4">Students Taking This Course</h3>

            {students.length === 0 ? (
                <p>No students have taken this course yet.</p>
            ) : (
                <ul>
                    {students.map(s => (
                        <li key={s.studentId}>
                            <Link to={`/students/${s.studentId}`}>
                                {s.fullName}
                            </Link>
                            {" — "}
                            Exams: {s.examCount}
                            {" ("}
                            {s.examScores.join(", ")}
                            {")"}
                            {" , Avg: "}
                            {s.averageScore.toFixed(2)}
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
}
