import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DocumentPostInfo } from "../models/law-document.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LawDocumentGeneratorService {
  baseAiApiUrl = 'http://localhost:5001/api/documentgenerator';
  constructor(private http: HttpClient) { }


  postDocucument(documentInfo: DocumentPostInfo): Observable<Blob> {
    return this.http.post<Blob>(`${this.baseAiApiUrl}`, documentInfo, {responseType:'blob' as 'json'});
  }
}
