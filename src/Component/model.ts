export interface Todo{
    id:number,
    todo: string,
    progress?: Progress
    isStarted: boolean,
    isDone: boolean,
    createdAt: string,
    deleted:boolean,
}



export enum Progress {
    BACKLOG = "BACKLOG",
    STAETED = "STARTED",
    DONE = "DONE",
    DELETED = "DELETED",
}