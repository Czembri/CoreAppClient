import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentAnalyzerService {
  baseAiApiUrl = 'http://localhost:5001/api/documentanalyzer';
  constructor(private http: HttpClient) {}

  analzyeDocument(file: FormData): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseAiApiUrl}`, file);
  }
}
