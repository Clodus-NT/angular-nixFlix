import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favs: any[] = [];
  displayElements: boolean = false;

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Retrieves current user data.
   * Retrieves movie data.
   * Checks to see if any of the movies are in the user object.
   * Displays any favorite that is in the user object.
   * @function getUserProfile
   * @returns user data
   * @returns movie data
   */
  getUserProfile(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        this.movies.forEach((movie: any) => {
          if (this.user.FavoriteMovies.includes(movie._id)) {
            this.favs.push(movie);
            this.displayElements = true;
          }
        });
      });
    })
  }

  
  /**
   * Removes a movie from current user's favorites list.
   * Reloads the page to make sure the removed movie is no longer
   * @param id {string}
   * @function removeFav
   * @returns current favorites
   */
  removeFav(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.ngOnInit();
      window.location.reload();
      return this.favs;
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

  updateProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log('updated user: ', response);
      if(this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please Login with your new credentials', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        })
      }
    })
  }

}
