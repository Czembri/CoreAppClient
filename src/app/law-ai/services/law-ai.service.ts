import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostModel, ResponseModel } from "../models/law-ai.model";

@Injectable({
  providedIn: 'root'
})
export class LawAIService {
  baseUrl = 'http://localhost:8001/api/v1/';
  constructor(private http: HttpClient) { }

  postQuery(query: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}constitution-ai`, { query: query } as PostModel);
  }

  loadData(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseUrl}constitution-ai/load-data`);
  }

  clearMemory(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseUrl}constitution-ai/clear-memory`);
  }
}
