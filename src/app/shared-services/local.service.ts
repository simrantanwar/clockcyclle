import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  saveInLocal(key, value) {
    localStorage.setItem(key, value);
  }

  getFromLocal(key) {
    return localStorage.getItem(key);
  }

  removeFromLocal(key) {
    localStorage.removeItem(key);
  }
}
