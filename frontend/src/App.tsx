import React, { useEffect, useState } from "react";
import "./styles.css";
import type { Task, TaskCreateOrUpdate } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useAppDispatch } from "./store/hooks";
import {
  addTask,
  updateTask,
  fetchTasks,
  deleteTask,
} from "./store/reducers/taskSlice";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const loadTasks = async () => {
    dispatch(fetchTasks());
  };

  const { tasks, error, loading } = useSelector((state: any) => state.tasks);

  const handleCreateOrUpdate = async (taskInput: TaskCreateOrUpdate) => {
    if (editingTask) {
      await dispatch(updateTask({ ...editingTask, ...taskInput }));
      setEditingTask(null);
    } else {
      await dispatch(addTask(taskInput));
    }
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteTask(id));
    loadTasks();
    // setError(null);
    // try {
    //   await deleteTask(id);
    //   setTasks((prev) => prev.filter((t) => t.id !== id));
    //   if (editingTask && editingTask.id === id) {
    //     setEditingTask(null);
    //   }
    // } catch (err: any) {
    //   setError(err?.message ?? "Failed to delete task");
    // }
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Task Manager</h1>
        <p className="subtitle">
          Manage tasks: create, view, update, and delete them.
        </p>
      </header>

      <main className="layout">
        <div className="layout-column">
          <TaskForm
            initialTask={editingTask}
            onSubmit={handleCreateOrUpdate}
            onCancelEdit={() => setEditingTask(null)}
          />
          {error && <div className="alert alert-error">{error}</div>}
        </div>

        <div className="layout-column">
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onRefresh={loadTasks}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
