import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AIMessageResponseModel } from "../models/law-ai.model";
import { MessageModel, PostModel, ResponseModel } from "src/app/shared/models/service.model";
import { createSecretHeader } from "src/app/shared/functions/secret-header";

@Injectable({
  providedIn: 'root'
})
export class LawAIService {
  baseAiApiUrl = 'http://localhost:8001/api/v1/law-ai';
  baseUrl = 'http://localhost:5001/api/lawai/';
  constructor(private http: HttpClient) { }

  postQuery(query: string): Observable<AIMessageResponseModel> {
    return this.http.post<AIMessageResponseModel>(`${this.baseAiApiUrl}`, { query: query } as PostModel, {headers: createSecretHeader()});
  }

  loadData(): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${this.baseAiApiUrl}/load-data`, {headers: createSecretHeader()});
  }

  clearMemory(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseAiApiUrl}/clear-memory`,{headers: createSecretHeader()});
  }

  saveChat(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}save-chat`, {}, {headers: createSecretHeader()});
  }
}
