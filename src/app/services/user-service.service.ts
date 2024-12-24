import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../model/user-entity';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private createUserAPIUrl = "http://localhost:5251/api/user/add";

  constructor(private http: HttpClient) { }

  createUser(userEntity: UserEntity): Observable<any>{
    return this.http.post<any>(this.createUserAPIUrl, userEntity);
  }
}
