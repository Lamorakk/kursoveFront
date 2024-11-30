import { useState } from "react";
import api from "../services/api";
import PropTypes from "prop-types";  // Import PropTypes

const ProjectForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/projects", formData);
            onSubmit(response.data); // Callback to update project list
        } catch (error) {
            console.error("Failed to create project:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={formData.name}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
        </form>
    );
};

// Prop validation for onSubmit
ProjectForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ProjectForm;
