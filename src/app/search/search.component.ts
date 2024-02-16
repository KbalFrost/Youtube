import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchQuery: string = '';
  suggestions: string[] = [];
  errorMessage: string = '';

  constructor(private youtubeService: YoutubeService, private router: Router) {}

  searchVideos() {
    if (this.searchQuery.trim() !== '') {
      this.youtubeService.searchVideos(this.searchQuery).subscribe(
        (data) => {
          this.router.navigate(['/searchresult'], { queryParams: { q: this.searchQuery } });
          console.log('Searching for:', this.searchQuery);
        },

        (error) => {
          if (error.status === 404) {
            this.errorMessage = 'No results found. Please try again with different keywords.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    } else {
      this.errorMessage = 'Please enter a search query.';
    }
  }

  autocompleteSearch() {
    if (this.searchQuery.length >= 1) {
      this.suggestions = [
        this.searchQuery + ' mvs',
        this.searchQuery + ' guides',
        this.searchQuery + ' tutorials',
        this.searchQuery + ' playlists'
      ];
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions = [];
    this.searchVideos();
  }
}