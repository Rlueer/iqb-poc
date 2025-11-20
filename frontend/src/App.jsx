import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./pages/StudentList.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import StudentCreate from "./pages/StudentCreate.jsx";
import ExamCreate from "./pages/ExamCreate.jsx";
import HomePage from "./pages/HomePage.jsx";
import CourseCreate from "./pages/CourseCreate.jsx";
import StudentEdit from "./pages/StudentEdit.jsx";
import CourseList from "./pages/CourseList.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/students" element={<StudentList />} />
                <Route path="/students/:id" element={<StudentDetail />} />
                <Route path="/students/new" element={<StudentCreate />} />
                <Route path="/students/:id/add-exam" element={<ExamCreate />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/courses/new" element={<CourseCreate />} />
                <Route path="/students/new" element={<StudentCreate />} />
                <Route path="/students/:id/edit" element={<StudentEdit />} />
                <Route path="/courses" element={<CourseList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
