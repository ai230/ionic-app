import { Activity } from "./activity";

export interface Travel {
    key?: string,//optional
    title: string;
    startDate: string;
    finishDate: string;
    activity: Array<Activity>;
    base64Image: string;
    photoUrl: string;
}