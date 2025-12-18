import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Task, TaskCreateOrUpdate } from "../../types";
import {
  fetchTasks as apiFetchTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../../api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  return await apiFetchTasks();
});

export const addTask = createAsyncThunk(
  "task/addTask",
  async (task: TaskCreateOrUpdate) => {
    return await apiCreateTask(task);
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (task: Task) => {
    console.log(task);
    return await apiUpdateTask(task.id, task);
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: number) => {
    await apiDeleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        console.log(index);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
