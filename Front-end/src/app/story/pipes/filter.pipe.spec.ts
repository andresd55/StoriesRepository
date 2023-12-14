import { Story } from '../interfaces/story';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });
});

it('should filter stories list', () => {
  // given
  const pipe = new FilterPipe();
  let stories: Story[] = [];
  const story1: Story = {
    id : 1,
    link : 'link',
    title : 'tittle story 1'
  }
  const story2: Story = {
    id : 2,
    link : 'link',
    title : 'tittle story 2'
  }
  const story3: Story = {
    id : 3,
    link : 'link',
    title : 'tittle story 3'
  }

  stories.push(story1);
  stories.push(story2);
  stories.push(story3);

  // when
  stories = pipe.transform(stories, '1');

  // then
  expect(stories.length).toBe(1);
});

it('should return stories list without filter', () => {
  // given
  const pipe = new FilterPipe();
  let stories: Story[] = [];
  const story1: Story = {
    id : 1,
    link : 'link',
    title : 'tittle story 1'
  }
  const story2: Story = {
    id : 2,
    link : 'link',
    title : 'tittle story 2'
  }
  const story3: Story = {
    id : 3,
    link : 'link',
    title : 'tittle story 3'
  }

  stories.push(story1);
  stories.push(story2);
  stories.push(story3);

  // when
  stories = pipe.transform(stories);

  // then
  expect(stories.length).toBe(3);
});