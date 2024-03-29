import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createSecretHeader } from "src/app/shared/functions/secret-header";
import { ResponseModel, PostModel, MessageModel } from "src/app/shared/models/service.model";

@Injectable({
  providedIn: 'root'
})
export class ConstitutionAIService {
  baseAiApiUrl = 'http://localhost:8001/api/v1/';
  baseUrl = 'http://localhost:5001/api/constitutionai/';
  constructor(private http: HttpClient) { }

  postQuery(query: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseAiApiUrl}constitution-ai`, { query: query } as PostModel, {headers: createSecretHeader()});
  }

  loadData(): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${this.baseAiApiUrl}constitution-ai/load-data`, {headers: createSecretHeader()});
  }

  clearMemory(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseAiApiUrl}constitution-ai/clear-memory`, {headers: createSecretHeader()});
  }

  saveChat(data: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}save-chat`, { responsesAndQuestions: data}, {headers: createSecretHeader()});
  }
}
