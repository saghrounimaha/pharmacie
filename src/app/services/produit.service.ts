import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/produit/getAllProducts`).pipe(
      catchError(this.handleError('getAllProducts'))
    );
  }

  createProduct(produit: any): Observable<any> {
    return this.http.post(`${this.apiURL}/produit/createProduct`, produit).pipe(
      catchError(this.handleError('createProduct'))
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/produit/getProductById/${id}`).pipe(
      catchError(this.handleError('getProductById'))
    );
  }

  updateProduct(id: number, produit: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/produit/updateProduit/${id}`, produit, {
      headers: new HttpHeaders({
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateProduit'))
    );
  }

  deleteProduct(id: number){
    return this.http.delete(`${this.apiURL}/produit/deleteProduit/${id}`).pipe(
      catchError(this.handleError('deleteProduit'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
