import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  loader(value) {
    this.loaderSubject.next(value);
  }

  getLoaderValue() {
    return this.loaderSubject.asObservable();
  }
}
