import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function CourseList() {
    const [courses, setCourses] = useState([]);

    const loadCourses = async () => {
        try {
            const res = await api.get("/courses");
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const deleteCourse = async (id) => {
        if (!window.confirm("Delete this course?")) return;

        try {
            await api.delete(`/courses/${id}`);
            loadCourses();
        } catch (err) {
            console.error(err);
            alert("Error deleting course.");
        }
    };

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-link">← Back to HomePage</Link>

            <h2>Courses</h2>

            <Link to="/courses/new" className="btn btn-success mb-3">
                + Add Course
            </Link>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th style={{ width: "150px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>
                            <Link to={`/courses/${c.id}`} className="btn btn-sm btn-info me-2">
                                Details
                            </Link>

                            <Link
                                to={`/courses/${c.id}/edit`}
                                className="btn btn-sm btn-warning me-2"
                            >
                                Edit
                            </Link>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteCourse(c.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
