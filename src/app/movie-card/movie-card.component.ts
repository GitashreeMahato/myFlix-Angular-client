import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { ActorComponent } from '../actor/actor.component';


interface IGenre{
  name: string,
  description: string
}
interface IActor{
  name: string,
  description: string
}
/**
 * @description Component representing the movie card.
 * @selector: 'app-movie-card'
 * @templateUrl: './movie-card.component.html'
 * @styleUrls: ['./movie-card.component.scss']
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    /** The movie data displayed in the card. */
    movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {}
  
//this method is called when Angular is done creating component
  ngOnInit(): void {
      this.getMovies();
      this.getFavorites();
  }

  /**
 * This will get all movies from the API
 * @returns movies
 */

// this function helps to fetch movies from FetchApiDataService with the help of getAllMovies()
  getMovies(): void{
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies= resp;
      console.log("this.movies:", this.movies);
      return this.movies;
    });
  }

   /** 
   * Get user info and set favorites
   * @returns favorite movies selected by user
   * */
 getFavorites(): void {
  this.fetchApiData.getOneUser().subscribe(
    (resp: any) => {
      if (resp.user && resp.user.favorite_movies) {
        this.favorites = resp.user.favorite_movies;
      } else {
        this.favorites = []; // Set an empty array if data is not available
      }
    },
    (error: any) => {
      console.error('Error fetching user data:', error);
      this.favorites = []; // Set an empty array on error as well
    }
  );
}

   /**
    * Check if a movie is a user's favorite already
    * @param movieId
    * @returns boolean
    * */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favorite_movies.indexOf(movieId) >= 0;
  }

  /**
   * Add a movie to a user's favorites 
   * Or remove on click if it is already a favorite
   * @param id 
   * @returns success message
   * */
addToFavorites(id: string): void {
  if (this.isFavoriteMovie(id)) {
    // Movie is already a favorite, so remove it
    this.removeFavoriteMovie(id);
  } else {
    // Movie is not a favorite, so add it
    this.fetchApiData.addfavoriteMovies(id).subscribe(() => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.getFavorites();
    });
  }
}

/**
 * This will remove movie from user's favorite list
 * @param id 
 * @returns suceess message
 */

removeFavoriteMovie(id: string): void {
  this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
    this.snackBar.open('removed from favorites', 'OK', {
      duration: 2000
    })
  });
}

 /** 
   *  Open genre information from GenreComponent 
   * @param genre 
   * @returns genres name
   * */
 openGenre(genres: IGenre[]): void {
  this.dialog.open(GenreComponent, {
    data: {
      name: 'Genres',
      description: genres.map(genre => genre.name).join(', '),
    },
    width: '400px',
  });
}

/** 
   *  Open actor information from ActorComponent 
   * @param actors 
   * @returns actors name
   * */
openActor(actors: IActor[]): void {
  this.dialog.open(ActorComponent, {
    data: {
      name: 'Actors',
      description: actors.map(actor => actor.name).join(', '),
    },
    width: '400px',
  });
}
/** 
 * Open director information from DirectorComponent
 * @param director name
 * @param director bio
 * @param director birth_year
 * @param director death_year
 * @returns director name, bio, birth_year, death_year
 * */
openDirector(name: string, bio: string, birth_year: string, death_year: string): void {
  this.dialog.open(DirectorComponent, {
    data: {
      name: name,
      bio: bio,
      birth_year: birth_year,
      death_year: death_year,
    },
    width: '400px',
  });
}

/** Open movie description from MovieInfoComponent
 * @param movie title
 * @param movie description aka Synopsis
 * @returns movie Title, Description
 * */
openSynopsis(Title: String, Description: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      Title: Title,
      Description: Description,
    },
    width: '400px',
  });
}

}



















































