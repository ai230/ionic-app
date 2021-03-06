import { DateTime } from "ionic-angular";

export interface Activity {
    key?: string,//optional
    iconUrl: string;
    title: string;
    startTime: string;
    finishTime: string;
    date: string;
    memo: string;
}