import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchResultComponent implements OnInit {
  videos: any[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.searchVideos();
    });
  }

  searchVideos() {
    if (this.query.trim() !== '') {
      this.youtubeService.searchVideos(this.query).subscribe((response: any) => {
        this.videos = response.items;
      });
    }
  }
}