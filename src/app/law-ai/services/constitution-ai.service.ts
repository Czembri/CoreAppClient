import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MessageModel, PostModel, ResponseModel } from "../models/law-ai.model";

@Injectable({
  providedIn: 'root'
})
export class ConstitutionAIService {
  baseAiApiUrl = 'http://localhost:8001/api/v1/';
  baseUrl = 'http://localhost:5001/api/constitutionai/';
  constructor(private http: HttpClient) { }

  postQuery(query: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseAiApiUrl}constitution-ai`, { query: query } as PostModel);
  }

  loadData(): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${this.baseAiApiUrl}constitution-ai/load-data`);
  }

  clearMemory(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseAiApiUrl}constitution-ai/clear-memory`);
  }

  saveChat(data: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}save-chat`, { responsesAndQuestions: data});
  }
}
