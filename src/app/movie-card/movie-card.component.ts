import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }
  
  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
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
