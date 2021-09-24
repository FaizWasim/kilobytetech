import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://hmaapi.kilobytetech.com";
  getParams(args = {}) {
    let params = new HttpParams();
    Object.keys(args).forEach((element) => {
      if (args[element]) {
        params = params.append(element, args[element]);
      }
    });
    return params;
  }
  logIn(postData): Observable<any> {
    const headers = new HttpHeaders().
      set("Authorization", "").
      set("Origin", "http://hma.kilobytetech.com").
      set("Referer", "http://hma.kilobytetech.com/");
    const url = this.baseUrl + `/auth/login`;
    return this.http.post(url, postData, { headers: headers });
  }

  getAllExistingClients(token, pageNo, size): Observable<any> {
    const headers = new HttpHeaders().
      set("Authorization", token).
      set("Origin", "http://hma.kilobytetech.com").
      set("Referer", "http://hma.kilobytetech.com/");
    const url = this.baseUrl + `/users?pageNo=${pageNo}&size=${size}`;
    return this.http.get(url, { headers: headers });
  }
  viewCompanyDetail(token, clientId, financialYear): Observable<any> {
    const headers = new HttpHeaders().
      set("Authorization", token).
      set("Origin", "http://hma.kilobytetech.com").
      set("Referer", "http://hma.kilobytetech.com/");
    const url = this.baseUrl + `/users?clientId=${clientId}&financialYear=${financialYear}`;
    return this.http.get(url, { headers: headers });
  }
  uploadFile(token, postFile, documentId): Observable<any> {
    const headers = new HttpHeaders().
      set("Authorization", token).
      set("Origin", "http://hma.kilobytetech.com").
      set("Referer", "http://hma.kilobytetech.com/");
    const url = this.baseUrl + `/documents/` + documentId;
    return this.http.put(url, postFile, { headers: headers });
  }
}
