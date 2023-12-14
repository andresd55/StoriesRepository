import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryModule } from './story/story.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, StoryModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
