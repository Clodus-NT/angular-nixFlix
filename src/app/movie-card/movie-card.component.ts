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

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      const currentUser = resp.Username;
      const currentFavs = resp.FavoriteMovies;
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }
  
  addFavorite(id: string, Title: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('You\'ve added ${Title} to your favorites.', 'OK', {
        verticalPosition: 'top'
      });
      console.log('movie_comp: ', resp)
      this.ngOnInit();
    })
  }

  removeFavorite(id: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('You\'ve removed ${Title} from your favorites.', 'OK', {
        verticalPosition: 'top'
      })
    })
  }

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

  openDirector(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio
      },
      width: '500px',
    });
  }

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
