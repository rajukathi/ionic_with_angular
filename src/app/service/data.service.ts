import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public authToken:any = "";
  private apiUrl:any = environment.apiUrl;
  public isUserSessionActive:any = new Subject<any>();
  constructor(private http: HttpClient) { 
    this.generateToken();    
  }

  generateToken() {
    
  }

  getData(endPoint:any): Observable<any> {
    let header = new HttpHeaders().set("Authorization", this.authToken);
    return this.http.get(this.apiUrl+endPoint,{headers:header});
  }

  postData(endPoint:any, data: any): Observable<any> {
    let header = new HttpHeaders().set("Authorization", this.authToken);
    return this.http.post<any>(this.apiUrl+endPoint, data, {headers:header});
  }

  login(username:any, password:any): Observable<any>{
    let response:any;
    response = this.postData('login',{
      email: username,
      password: password
    }).subscribe(
      (response: any) => {
        this.setToken(response.success.token);
      },
      (err: any) => {
      }
    );
    return response;
  }

  setToken(value:any) {
    this.authToken = "";
    localStorage.setItem('authToken', "");
    this.isUserSessionActive.next(false);
    if(value != "") {
      this.authToken = "Bearer " + value;
      localStorage.setItem('authToken', this.authToken);
      this.isUserSessionActive.next(true);
    }
  }

  getToken() {
    this.authToken = localStorage.getItem('authToken');
    return this.authToken;
  }

  isUserLoggedIn(): boolean {
    let response:boolean;
    if( this.authToken == "") {
      this.isUserSessionActive.next(false);
      response = false;
    } else {
      this.isUserSessionActive.next(true);
      response = false;
    }
    return response;
  }

  checkUserLoggedIn(): Observable<any> {
    let response:any;
    response = this.isUserLoggedIn();
    return response;
  }

  logout() {
    this.setToken('');
  }
}