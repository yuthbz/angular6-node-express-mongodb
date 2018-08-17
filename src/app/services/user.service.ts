import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }


  getUserLists() {

    return this.http.get('/api/gets').pipe(map((result) => result.json().message));

  }

  addUsers(data) {

    return this.http.post('/api/adds', data).pipe(map((result) => result.json()));

  }

  editUsers(id: string) {

    return this.http.get('/api/edits/' + id).pipe(map((result) => result.json().message));

  }

  deleteUsers(id: string) {

    return this.http.delete('/api/deletes/' + id).pipe(map((result) => result.json()));

  }


}
