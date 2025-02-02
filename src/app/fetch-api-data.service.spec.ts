import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FetchApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchApiDataService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://myflix-api-app-ff32afce7dc8.herokuapp.com/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FetchApiDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(FetchApiDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no pending requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle HTTP errors correctly', () => {
    const mockUserDetails = { username: 'testuser', password: 'password123' };

    service.userRegistration(mockUserDetails).subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Something went wrong');
      }
    });

    const req = httpMock.expectOne(`${apiUrl}users`);
    req.flush('Error message', { status: 500, statusText: 'Internal Server Error' });
  });

  it('[User registration] should make a POST request to register a user', () => {
    const mockUserDetails = { username: 'testuser', password: 'password123' };
    const mockResponse = { message: 'User registered successfully' };

    service.userRegistration(mockUserDetails).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('[Update user] should make a PUT request to update user info', () => {
    const mockUserDetails = { username: 'testuser', password: 'newpass' };
    const mockResponse = { message: 'User updated successfully' };

    service.updateUser('testuser', mockUserDetails).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users/testuser`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('[Get all users] should make a GET request to retrieve all users', () => {
    const mockResponse = [{ username: 'testuser' }];

    service.getAllUsers().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('[Delete user] should make a DELETE request to remove a user', () => {
    const mockResponse = { message: 'User deleted' };

    service.deleteUser('testuser').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users/testuser`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('[Get all movies] should make a GET request to retrieve all movies', () => {
    const mockResponse = [{ title: 'Inception' }];

    service.getAllMovies().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}movies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('[Get movie by title] should make a GET request to retrieve movie details', () => {
    const mockResponse = { title: 'Inception', director: 'Christopher Nolan' };

    service.getMovieByTitle('Inception').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}movies/title/Inception`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('[Get movies by genre] should make a GET request to retrieve movies by genre', () => {
    const mockResponse = [{ title: 'The Dark Knight' }];

    service.getMoviesByGenre('Action').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}movies/genres/Action`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('[Get director by name] should make a GET request to retrieve director details', () => {
    const mockResponse = { name: 'Christopher Nolan', movies: ['Inception'] };

    service.getDirectorByName('Christopher Nolan').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}directors/Christopher%20Nolan`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('[Add movie to favorites] should make a POST request to add a movie to favorites', () => {
    const mockResponse = { message: 'Movie added to favorites' };

    service.addMovieToFavorites('testuser', '123').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users/testuser/movie/123`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('[Remove movie from favorites] should make a DELETE request to remove a movie from favorites', () => {
    const mockResponse = { message: 'Movie removed from favorites' };

    service.removeMovieFromFavorites('testuser', '123').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}users/testuser/movie/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});