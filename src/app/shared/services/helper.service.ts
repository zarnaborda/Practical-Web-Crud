import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  setLoading(isLoading: boolean) {
    return this.isLoadingSubject.next(isLoading);
  }

}
