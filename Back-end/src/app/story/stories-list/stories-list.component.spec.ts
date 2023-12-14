import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesListComponent } from './stories-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from '../pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoryService } from '../Services/story.service';
import { of, throwError } from 'rxjs';
import { ResponseBase } from '../interfaces/response-base';
import { Story } from '../interfaces/story';

describe('StoriesListComponent', () => {
  let component: StoriesListComponent;
  let fixture: ComponentFixture<StoriesListComponent>;
  const storyMock: Story = {
    id: 1,
    title: 'test story',
    link: 'url'
  }
  let responseMock: ResponseBase = {
    message : 'success',
    status : true,
    data : [storyMock],
    quantity : 1
  } 

  beforeAll(() => {
    window.onbeforeunload = () => '';
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxPaginationModule],
      declarations: [ StoriesListComponent, FilterPipe ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calls ngOnInit', () => {
    // given
    const componentSpy = spyOn(component, 'ngOnInit').and.callThrough();
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

     // then
    expect(componentSpy).toHaveBeenCalled();
  });

  it('should calls onSearchStory', () => {
    // given
    const componentSpy = spyOn(component, 'onSearchStory').and.callThrough();
    expect(componentSpy).not.toHaveBeenCalled();

    // when
    component.onSearchStory('Test');

    // then
    expect(componentSpy).toHaveBeenCalled();
  });

  it('should calls openLink', () => {
    // given
    const componentSpy = spyOn(component, 'openLink').and.callThrough();

    // when
    component.openLink('url');

    // then
    expect(componentSpy).toHaveBeenCalled()
  });

  it('should calls pageChangeEvent', () => {
    // given
    const page = 1;

    // when
    component.pageChangeEvent(page);

    // then
    expect(component.config.currentPage).toBe(page);
  });

  it('should call refresh method', () => {
    // given
    const componentSpy = spyOn(component, 'refresh').and.callThrough();
    expect(componentSpy).not.toHaveBeenCalled();
    // when
    component.ngOnInit();
    // then
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('should test number of elements', ()=> {
    // given
    const restService = TestBed.inject(StoryService);    
    spyOn(restService, 'getNewstStories').and.returnValue(of(responseMock));

    // when
    component.ngOnInit();

    // then
    expect(component.listStories.length).toBe(1);
});

  it('should render error message', async() => {
    // given
    const restService = TestBed.inject(StoryService);
    const responseFailedMock = {
      message : 'error',
      status : false,
      data : [],
      quantity : 1
    } 
    spyOn(restService, 'getNewstStories').and.returnValue(of(responseFailedMock));

    // when
    component.ngOnInit();
    const fixture = TestBed.createComponent(StoriesListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(component.listStories.length).toBe(0);
    expect(compiled.querySelector('#errorMessage')?.textContent).toContain('Server error!');
  });

  it('should have default error message', async() => {
    // given
    const restService = TestBed.inject(StoryService);
    const responseFailedMock = {
      status : false,
      data : [],
      quantity : 1
    } 
    spyOn(restService, 'getNewstStories').and.returnValue(of(responseFailedMock));

    // when
    component.ngOnInit();
    const fixture = TestBed.createComponent(StoriesListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(component.listStories.length).toBe(0);
  });

  it('should render error message with exception', async() => {
    // given
    const restService = TestBed.inject(StoryService);
    spyOn(restService, 'getNewstStories').and.returnValue(throwError('error message'));

    // when
    component.ngOnInit();
    const fixture = TestBed.createComponent(StoriesListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(component.listStories.length).toBe(0);
  });

  it('should render tittle', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('h2')?.textContent).toContain('The Newest Stories');
  });

  it('should render refresh button', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('#refreshButton')?.textContent).toContain('Refresh stories');
  });

  it('should render search bar', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('#inputSearchStory')?.getAttribute('placeholder')).toContain('Search story...');
  });

  it('should render table headers', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('.table thead')?.childNodes.item(0).textContent).toContain('Tittle');
    expect(compiled.querySelector('.table thead')?.childNodes.item(0).textContent).toContain('Detail');
  });

  it('should render table caption', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('.table caption')?.childNodes.item(0).textContent).toContain('List of stories');
  });

  it('should render stories', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('.table tbody')?.childNodes.length).toBeGreaterThan(1);
  });

  it('should render link stories', async () => {
    // given
    const restService = TestBed.inject(StoryService);    
    spyOn(restService, 'getNewstStories').and.returnValue(of(responseMock));

    // when
    component.ngOnInit();
    const fixture = TestBed.createComponent(StoriesListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelectorAll('.table tbody tr > td > button').item(0).textContent).toContain('View story');
  });

  it('should render message loading', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    // then
    expect(compiled.querySelectorAll('.table tbody tr > td').item(0).textContent).toContain('Loading...');
  });


  it('should render message no records found', async () => {
    // given
    const restService = TestBed.inject(StoryService);
    const responseEmptyMock = {
      status : true,
    } 
    spyOn(restService, 'getNewstStories').and.returnValue(of(responseEmptyMock));

    // when
    component.ngOnInit();
    const fixture = TestBed.createComponent(StoriesListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelectorAll('.table tbody tr > td').item(0).textContent).toContain('No records found.');
  });

  it('should render paginator', () => {
    // given
    const fixture = TestBed.createComponent(StoriesListComponent);

    // when
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // then
    expect(compiled.querySelector('.ngx-pagination')?.textContent).toContain(' Previous ');
  });
});
