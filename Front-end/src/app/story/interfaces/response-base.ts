import { Story } from "./story";

export class ResponseBase {
    public message?: string;
    public quantity?: number;
    public status?: boolean;
    public data?: Story[];
}