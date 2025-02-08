/**
 * @fileoverview Service to interact with the MyFlix API.
 * Provides methods for user authentication, user management, and retrieving movie-related data.
 */

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/** Base API URL for the MyFlix API */
const apiUrl = 'https://myflix-api-app-ff32afce7dc8.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Creates an instance of FetchApiDataService.
   * @param {HttpClient} http - Angular's HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user.
   * @param {object} userDetails - Object containing user information.
   * @returns {Observable<any>} An observable containing the server response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('User Details:', userDetails);
    return this.http.post(`${apiUrl}users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Updates user information.
   * @param {string} username - The username of the user to update.
   * @param {object} userDetails - Object containing updated user information.
   * @returns {Observable<any>} An observable containing the server response.
   */
  public updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(`${apiUrl}users/${encodeURIComponent(username)}`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all registered users.
   * @returns {Observable<any>} An observable containing the list of users.
   */
  public getAllUsers(): Observable<any> {
    return this.http.get(`${apiUrl}users`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * @param {object} loginData - Object containing username and password.
   * @returns {Observable<any>} An observable containing the server response.
   */
  public userLogin(loginData: any): Observable<any> {
    return this.http.post(`${apiUrl}login`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user account.
   * @param {string} username - The username of the user to be deleted.
   * @returns {Observable<any>} An observable containing the server response.
   */
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${encodeURIComponent(username)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all movies.
   * @returns {Observable<any>} An observable containing the list of movies.
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}movies`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves movie details by title.
   * @param {string} title - The title of the movie.
   * @returns {Observable<any>} An observable containing the movie details.
   */
  public getMovieByTitle(title: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/title/${encodeURIComponent(title)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of movies by genre.
   * @param {string} name - The name of the genre.
   * @returns {Observable<any>} An observable containing movies of the specified genre.
   */
  public getMoviesByGenre(name: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/genres/${encodeURIComponent(name)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves director details by name.
   * @param {string} name - The name of the director.
   * @returns {Observable<any>} An observable containing director details.
   */
  public getDirectorByName(name: string): Observable<any> {
    return this.http.get(`${apiUrl}directors/${encodeURIComponent(name)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's favorites.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to add.
   * @returns {Observable<any>} An observable containing the server response.
   */
  public addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve authentication token

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Include token in Authorization header
      'Content-Type': 'application/json', // Ensure correct content type
    });

    return this.http
      .post(`${apiUrl}users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movieId)}`, null, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from a user's favorites.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to remove.
   * @returns {Observable<any>} An observable containing the server response.
   */
  public removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${encodeURIComponent(username)}/movie/${encodeURIComponent(movieId)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param {HttpErrorResponse} error - The error response object.
   * @returns {Observable<never>} An observable that throws an error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
