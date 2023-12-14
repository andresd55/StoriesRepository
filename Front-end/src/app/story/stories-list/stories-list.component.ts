import { Component, OnInit } from '@angular/core';
import { Story } from '../interfaces/story';
import { StoryService } from '../Services/story.service';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrl: './stories-list.component.scss'
})
export class StoriesListComponent implements OnInit {
    listStories: Story[] = [];
    page: number = 1;
    search: string = '';
    errorMessage: string = '';
    loading: boolean = false;
    total: number = 0;
    config = {
      itemsPerPage: 10, currentPage: this.page, totalItems: this.total
    };

    constructor( private storyService: StoryService ) {}

    ngOnInit(): void {
      this.refresh();
    }
  
    onSearchStory( search: string ) {
      this.page = this.config.currentPage = 1;
      this.search = search;
    }

    refresh(): void{
      this.loading = true;
      this.listStories = [];
      this.errorMessage = '';
      this.storyService.getNewstStories().subscribe(
        (response) => {
          if (response.status) {
            this.listStories = response.data ?? [];
            this.total = response.quantity ?? 0;
          } else {
            this.errorMessage = response.message ?? '';
          }
          
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error.message;
          this.loading = false;
        },
        () => { }
      );
    }

    openLink(storyUrl: string): void{
      window.open(storyUrl, "_blank");
    }

    pageChangeEvent(event: number) {
      this.config.currentPage = event;
    }
}
