import { BrowserRouter, Routes, Route } from "react-router-dom";
import profileContent from "./data/profileContent";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/BlogsPage";
import ProjectsPage from "./pages/ProjectsPage";
import IdeasPage from "./pages/IdeasPage";

export default function App() {
  const { identity, navLinks } = profileContent;

  return (
    <BrowserRouter>
      <Nav name={identity.name} links={navLinks} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/ideas" element={<IdeasPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
