import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrowser } from '../_models/browser.model';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  baseUrl = 'http://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getBrowserInfo(browserName: string) {
    return this.http.get<IBrowser>(`${this.baseUrl}browser?browserName=${browserName}`);
  }
}
