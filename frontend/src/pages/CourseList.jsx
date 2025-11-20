import { useEffect, useState } from "react";
import api from "../api/axios";
import {Link} from "react-router-dom";

export default function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get("/courses")
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Link to="/" className="btn btn-link">
                ← Back to HomePage
            </Link>

            <h1>Course List</h1>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Course Name</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(c => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
