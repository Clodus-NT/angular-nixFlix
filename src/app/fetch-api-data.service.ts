import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://nixflix-93.herokuapp.com/';
//Grab token and user from local storage
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 
  /**
   * Calls an API endpoint to register new user.
   * @param userDetails {any}
   * @function userRegistration
   * @returns new user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Calls an API endpoint to login the user.
   * @param userDetails {any}
   * @function userLogin
   * @returns user data object
   */
  public userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Calls an API endpoint to retrieve all movie objects in the database.
   * @function getAllMovies
   * @returns all movie data objects
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls an API endpoint to retrieve a selected movie's data object.
   * @function getSingleMovie
   * @returns a single movie data object
   */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls an API endpoint that retrieves the director data from the movie object
   * @returns the director data
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/movies/directors/:directorName', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls an API endpoint that retrieves the genre data from the movie object.
   * @function getGenre
   * @returns the genre data
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/movies/genre/:genreName', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls an API endpoint to retrieve current user's favorite movies.
   * @function getFavoriteMovies
   * @returns current user's favorite movies
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls an API endpoint that posts the selected movie to the current user object.
   * @param MovieID {string}
   * @function addFavoriteMovies
   * @returns updated favorite movies that has been posted to user object
   */
  public addFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('Movie: ', MovieID)
    console.log('Token: ', token)
    return this.http
      .post(apiUrl + `users/${username}/movies/${MovieID}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Calls an API endpoint that deletes a favorited movie from the user object
   * @param MovieID {string}
   * @function deleteFavoriteMovies
   * @returns updated favorite movies from the user object
   */
  public deleteFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Calls an API endpoint the retrieves the current user's data object.
   * @function getUser
   * @returns current user object
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      catchError(this.handleError));
  }

  /**
   * Calls an API endpoint that allows current user to update their profile info.
   * @param userData {object}
   * @returns updated user object
   */
  editUser(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  /**
   * Calls and API endpoint the allows the current user to delete their profile.
   * @function deleteUser
   * @returns delete status
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  //Error Handling function the is called within the above functions.
  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(
      'Something bad happened; please try again later.');
    }
}