import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private apiUrl = 'http://localhost:3000/film';

  constructor(private http: HttpClient) { }

  addFilms(film:Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiUrl}/ajouter`, film)
      .pipe(
        catchError(this.handleError)
      );
  }
  getListeFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/lister`)
      .pipe(
        catchError(this.handleError)
      );
  }
  supprimerFilm(id:string): Observable<any> {
    const url = `${this.apiUrl}/${id}/supprimer`;

    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Fonction de gestion des erreurs
  private handleError(error: any) {
    console.error('An error occurred:', error);

    // Enrichir l'objet d'erreur avec des détails supplémentaires si nécessaire
    const errorMessage = (error.error instanceof ErrorEvent) ?
      `Error: ${error.error.message}` :
      `Server error: ${error.status} - ${error.message}`;

    return throwError(errorMessage);
  }
  getById(_id:string): Observable<Film> {
    const url = `${this.apiUrl}/${_id}`;
    return this.http.get<Film>(url);
  }
  updateFilms(film: Film, id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/modifier/${id}`, film);
  }  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  searchFilm(keyword: string): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/rechercher?keyword=${keyword}`);

  }
}  