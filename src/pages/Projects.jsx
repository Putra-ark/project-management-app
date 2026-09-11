import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import Modal from "../components/Modal";

export default function Projects({
  projects,
  tasks,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  function openCreateModal() {
    setEditingProject(null);
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setEditingProject(project);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProject(null);
  }

  function handleSubmit(formData) {
    if (editingProject) {
      onUpdate(editingProject.id, formData);
    } else {
      onCreate(formData);
    }
    closeModal();
  }

  function handleDelete(project) {
    const confirmed = window.confirm(
      `Delete "${project.name}"? Related tasks will also be deleted.`
    );
    if (confirmed) {
      onDelete(project.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All Projects</h2>
          <p className="text-sm text-slate-500">Create and manage your projects</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="mb-4 text-slate-500">No projects yet</p>
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + New Project
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasks={tasks}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={editingProject ? "Edit Project" : "New Project"}
        onClose={closeModal}
      >
        <ProjectForm
          key={editingProject ? editingProject.id : "new-project"}
          initialData={editingProject}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
