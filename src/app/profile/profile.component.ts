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
  favs: any = null;
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

  // GET USER (and push favorites to movies array)
  getUserProfile(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      //Get movies and push all favs to movies array
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        this.movies.forEach((movie: any) => {
          if (this.user.FavoriteMovies.includes(movie._id)) {
            this.favs.psuh(movie);
            this.displayElements = true;
          }
        })
      })
    })
  }

}
