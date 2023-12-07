import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


// Declaring the api url that will provide data for the client app
const apiUrl = 'https://user-movies-b3ba594615fa.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

// Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

    // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

    // Making the api call for get all movies endpoint 
    getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for get one movies endpoint
      getOneMovie(title: string): Observable<any>{
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
          {
            Authorization: 'Bearer' + token,
        }
        )}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
      }

    // Making the api call for get one director endpoint
    getOneDirector(directorName:string): Observable< any >{
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/director' + directorName, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
    }

    // Making the api call for get one genre endpoint
    getOneGenre(genreName:string): Observable< any >{
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/genre' + genreName, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
    }

    // Making the api call for get user endpoint
    getUser(username:string): Observable< any >{
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
    }

    // Making the api call for get favourite movies for a user endpoint
    getfavoriteMovies(): Observable< any >{
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      )
    }

    // Making the api call for add movie to favorite movies endpoint
    addfavoriteMovies(movieId: string): Observable< any >{
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/' + username + 'movies/' + movieId, {
        headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
    }

    // Making the api call for the edit user endpoint
editUser(updatedUser: any): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + username, updatedUser, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Making the api call for the delete user endpoint
deleteUser(): Observable<any> {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + userId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Making the api call for deleting a movie from the favorite movies endpoint
deleteFavoriteMovie(movieId: string): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
