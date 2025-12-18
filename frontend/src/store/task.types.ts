import type { Task } from "../types";

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export interface ADDTASK {
    type: typeof ADD_TASK;
    payload: Task;
}
export interface UPDATETASK {
    type: typeof UPDATE_TASK;
    payload: Task;
}
export interface DELETETASK {
    type: typeof DELETE_TASK;
    payload: Task;
}

export const FETCH_TASKS = 'FETCH_TASKS';

export interface TaskStates {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export interface TaskActions {
    type: typeof ADD_TASK | typeof UPDATE_TASK | typeof DELETE_TASK;
    payload: Task;
}

export interface FetchTasksAction {
    type: typeof FETCH_TASKS;
    payload: Task[];
}