import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentPostInfo } from "../models/law-document.model";
import { ResponseModel } from "src/app/shared/models/service.model";

@Injectable({
  providedIn: 'root'
})
export class LawDocumentGeneratorService {
  baseAiApiUrl = 'http://localhost:8001/api/v1/law-ai';
  constructor(private http: HttpClient) { }


  postDocucument(documentInfo: DocumentPostInfo): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseAiApiUrl}`, {body: documentInfo});
  }
}
