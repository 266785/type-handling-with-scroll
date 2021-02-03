import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentModel} from '../models/student-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  fetchItems(params: any): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>('/students', {params});
  }

}
