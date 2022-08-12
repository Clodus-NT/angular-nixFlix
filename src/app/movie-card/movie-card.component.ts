import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  currentUser: any = null;
  currentFavs: any = null;
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  /**
   * Retrieves current user object.
   * @function getCurrentUser
   * @returns current user data
   */
  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      const currentUser = resp.Username;
      const currentFavs = resp.FavoriteMovies;
    })
  }

  /**
   * Retrieves movie object.
   * @function getMovies
   * @returns movie data
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }
  
  /**
   * Adds selected movie to current user object.
   * Displays message that confirms the movie has been added to current user's favorites.
   * @param id {string}
   * @param Title {string}
   * @function addFavorite
   * @returns movie object
   */
  addFavorite(id: string, Title: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('You\'ve added ' + `${Title}` +  ' to your favorites.', 'OK', {
        verticalPosition: 'top'
      });
      console.log('movie_comp: ', resp)
      this.ngOnInit();
    })
  }

  /**
   * Removes a movie from current user's favorites list.
   * Displays a message confirming movie has been removed from current user's favorites.
   * @param id {string}
   * @function removeFav
   * @returns current favorites
   */
  removeFavorite(id: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('Remove from Favorites.', 'OK', {
        verticalPosition: 'top'
      })
    })
  }

  /**
   * Opens a dialog box when user clicks on synopsis button on movie card.
   * Displays synopsis of the movie.
   * @param title {string}
   * @param impagePath {any}
   * @param description {string}
   * @function openSynopsis
   */
  openSynopsis(title: string, impagePath: any, description: string,): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: impagePath,
        Description: description,
      },
      width: '500px',
    })
  }

  /**
   * Opens dialog box when user clicks director button on movie card.
   * Displays the director's bio.
   * @param name {string}
   * @param bio {string}
   * @function openDirector
   */
  openDirector(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio
      },
      width: '500px',
    });
  }

  /**
   * Opens dialog box when user clicks on genre button on movie card.
   * Displays genre info.
   * @param name {string}
   * @param description {string}
   * @function openGenre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px',
    });
  }  
}
