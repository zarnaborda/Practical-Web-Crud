import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HelperService } from '../../shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService,
  ) { }

  handleResponse(): void {
    // turn off loading spinner
    this.helperService.setLoading(false);
  }
  handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  httpRequestGet(url: string): Observable<any> {
    return this.httpClient.get<any[]>(url)
      .pipe(
        finalize(() => this.handleResponse()),
        catchError((err: any) => this.handleError(err)));
  }
  httpRequestPost(url: string, data: any): Observable<any> {
    return this.httpClient.post<any[]>(url, data)
      .pipe(
        finalize(() => this.handleResponse()),
        catchError((err: any) => this.handleError(err)));
  }
  httpRequestPut(url: string, data: any): Observable<any> {
    return this.httpClient.put<any[]>(url, data)
      .pipe(
        finalize(() => this.handleResponse()),
        catchError((err: any) => this.handleError(err)));
  }
  httpRequestDelete(url: string): Observable<any> {
    return this.httpClient.delete<any[]>(url)
      .pipe(
        finalize(() => this.handleResponse()),
        catchError((err: any) => this.handleError(err)));
  }

  loadGetJSON(url: any, success: Function) {
    this.helperService.setLoading(true);
    this.httpRequestGet(url).subscribe((res) => {
      if (res) {
        success.call(null, res);
      }
    }, (err) => {
      this.failureMessage(err);
    });
  }

  loadPostJSON(url: any, data: any, success: Function) {
    this.helperService.setLoading(true);
    this.httpRequestPost(url, data).subscribe((res) => {
      if (res) {
        success.call(null, res);
      }
    }, (err) => {
      this.failureMessage(err);
    });
  }

  loadPutJSON(url: any, data: any, success: Function) {
    this.helperService.setLoading(true);
    this.httpRequestPut(url, data).subscribe((res) => {
      if (res) {
        success.call(null, res);
      }
    }, (err) => {
      this.failureMessage(err);
    });
  }

  loadDeleteJSON(url: any, success: Function) {
    this.helperService.setLoading(true);
    this.httpRequestDelete(url).subscribe((res) => {
      if (res) {
        success.call(null, res);
      }
    }, (err) => {
      this.failureMessage(err);
    });
  }

  failureMessage(error) {
    if (error) {
      const message = error.status == 0 ? error.statusText : error.message;
      console.error(message)
      alert('Response Error:' + message);
    } else {
      alert('Response Error');
    }
  }
}
