import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL ="http://localhost:3000"


  constructor(private http: HttpClient,private tokenService : TokenService) { 
  }

  // Récupère tous les utilisateurs
  getAllUsers(): Observable<any[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<any[]>(`${this.apiURL}/users/getAllUser`, { headers }).pipe(
      catchError(this.handleError('getAllUsers', []))
    );

  //   return this.http.get<any[]>(`${this.apiURL}/users/getAllUser`).pipe(
  //       catchError(this.handleError('getAllUsers', []))
  // )
}

  // Crée un nouvel utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/users/createUser`, user).pipe(
      catchError(this.handleError('createUser'))
    );
  }

  // Gère les erreurs HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiURL}/users/updateUser/${id}`, user).pipe(
      catchError(this.handleError('updateUser'))
    );
  }

  // Récupère un utilisateur par son ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/users/getUserById/${id}`).pipe(
      catchError(this.handleError('getUserById'))
    );
  }

  deleteUser(id: number){
    return this.http.delete(`${this.apiURL}/users/deleteUser/${id}`).pipe(
      catchError(this.handleError('deleteUser'))
    );
  }

   // Méthode pour rechercher des utilisateurs par nom
   searchUsersByName(name: string): Observable<any[]> {
    let params = new HttpParams().set('name', name);
    return this.http.get<any[]>(`${this.apiURL}/users/getUserByName`, { params });
  }

  getImage(image:String){
    return this.http.get(`${this.apiURL}/upload/${image}`).pipe(
      catchError(this.handleError('get Image'))
    );
  }

  CheckAuthorization(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/users/check-authorization/${id}`).pipe(
      catchError(this.handleError('check-authorization'))
    );
  }

}
