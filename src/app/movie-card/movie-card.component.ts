import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // declare as an movie array that keeps movies while returns from API call
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
    * */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favorite_movies.indexOf(movieId) >= 0;
  }

  /**
   * Add a movie to a user's favorites 
   * Or remove on click if it is already a favorite
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

// addToFavorites(id: string): void {
//   this.fetchApiData.addfavoriteMovies(id).subscribe(() => {
//     this.snackBar.open('Movie added to favorites!', 'OK', {
//       duration: 2000
//     })
//   });
// }

  /** 
   * Removes a movie from a user's favorites
   * */
  removeFavoriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });

    const username = localStorage.getItem('username');
    if (username !== null) {
      // Fetch the updated favorite movies data
      this.fetchApiData.getfavoriteMovies().subscribe((favorites: any) => {
        this.favorites = favorites;
      });
    }
  });
}


// removeFavoriteMovie(id: string): void {
//   this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
//     this.snackBar.open('removed from favorites', 'OK', {
//       duration: 2000
//     })
//   });
// }

 /** 
   *  Open genre information from GenreComponent 
   * @param genre name
   * @paramgenre description
   * */
 openGenre(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      name: name,
      description: description,
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
 * */
openDirector(name: string, bio: string, birth_year: Date, death_year: Date): void {
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

// openDirector(Directors: any): void{
//   this.dialog.open(MovieInfoComponent, {
//     data: {
//       Title: Directors.name,
//       Decription: Directors.bio
//     }
//   })
// }

/** Open movie description from MovieInfoComponent
 * @param movie title
 * @param movie description aka Synopsis
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
