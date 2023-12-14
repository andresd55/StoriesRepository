import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesListComponent } from './stories-list/stories-list.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    StoriesListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserModule
  ]
})
export class StoryModule { }
