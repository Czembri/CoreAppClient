import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICompanyInfo } from "../_models/company.model";

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    baseUrl = 'http://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    getCompanyByNumber(number: string) {
        return this.http.get<ICompanyInfo>(`${this.baseUrl}companies?nip=${number}`);
    }

    getCompanies() {
      return this.http.get<ICompanyInfo[]>(`${this.baseUrl}companies`);
    }
}
