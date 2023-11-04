import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AIMessageResponseModel, MessageModel, PostModel, ResponseModel } from "../models/law-ai.model";

@Injectable({
  providedIn: 'root'
})
export class LawAIService {
  baseAiApiUrl = 'http://localhost:8001/api/v1/law-ai';
  baseUrl = 'http://localhost:5001/api/lawai/';
  constructor(private http: HttpClient) { }

  postQuery(query: string): Observable<AIMessageResponseModel> {
    return this.http.post<AIMessageResponseModel>(`${this.baseAiApiUrl}`, { query: query } as PostModel);
  }

  loadData(): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${this.baseAiApiUrl}/load-data`);
  }

  clearMemory(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseAiApiUrl}/clear-memory`);
  }

  saveChat(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}/save-chat`, {});
  }
}
