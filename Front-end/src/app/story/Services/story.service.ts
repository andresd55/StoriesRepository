import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBase } from '../interfaces/response-base';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

    private url: string = 'https://storiesapi.azurewebsites.net';

    constructor(public http: HttpClient) { }

    getNewstStories(): Observable<ResponseBase> {
        return this.http.get<ResponseBase>(`${this.url}/NewStories`);
    }
}
