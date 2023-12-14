import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesListComponent } from './story/stories-list/stories-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/stories', pathMatch: 'full' },
  { path: '**', pathMatch: 'full',  
        component: StoriesListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }