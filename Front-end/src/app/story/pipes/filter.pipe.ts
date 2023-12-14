import { Pipe, PipeTransform } from '@angular/core';
import { Story } from '../interfaces/story';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(stories: Story[], search: string = ''): Story[] {    
    stories = stories.filter(story => story.link);

    if(!search){
      return stories;
    }
    
    return stories.filter(story => story.title.toLowerCase().includes(search.toLowerCase()))
  }

}
