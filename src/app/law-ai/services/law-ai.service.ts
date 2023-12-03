import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AIMessageResponseModel, MessageAi, MessagesResponseModel } from "../models/law-ai.model";
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

  loadData(context: MessageAi[] = []): Observable<MessageModel> {
    let body = {body: []};
    if (context.length > 0) {
      body.body = context;
    }
    return this.http.post<MessageModel>(`${this.baseAiApiUrl}/load-data`,  body, {headers: createSecretHeader()});
  }

  clearMemory(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseAiApiUrl}/clear-memory`,{headers: createSecretHeader()});
  }

  saveChat(chatId?: number): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}save-chat/${chatId}`, {}, {headers: createSecretHeader()});
  }

  getChats(): Observable<MessagesResponseModel[]> {
    return this.http.get<MessagesResponseModel[]>(`${this.baseUrl}get-chats`);
  }

  getChat(chatId: number): Observable<MessagesResponseModel> {
    return this.http.get<MessagesResponseModel>(`${this.baseUrl}get-chat/${chatId}`);
  }
}
