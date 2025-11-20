import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentDetail() {
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [exams, setExams] = useState([]);
    const [average, setAverage] = useState(null);
    const [completedCourses, setCompletedCourses] = useState([]);



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

    return (
        <div>
            <Link to="/students" className="btn btn-link">
                ← Back to Students
            </Link>
            <h1>Student Detail</h1>

            {student && (
                <div>
                    <h3>{student.fullName}</h3>
                    <p>Email: {student.email}</p>
                    <p>Number: {student.number}</p>
                    <p>GSM: {student.gsmNumber}</p>
                </div>
            )}

            <Link to={`/students/${id}/add-exam`} className="btn btn-success mb-3">
                + Add Exam
            </Link>


            <h3>Average Score</h3>
            {average === null ? (
                <p>No completed courses yet.</p>
            ) : (
                <p><strong>{Number(average).toFixed(2)}</strong></p>
            )}

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


            <h3>Exam Results</h3>

            {exams.length === 0 ? (
                <p>No exams found.</p>
            ) : (
                <ul>
                    {exams.map(e => (
                        <li key={e.id}>
                            {e.course.name} — Score: {e.score}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
