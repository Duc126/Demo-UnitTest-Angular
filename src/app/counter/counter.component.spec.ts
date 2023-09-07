import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    });
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Write a unit test to check if the component is created successfully.
  it('should Create Counter Component', () => {
    expect(component).toBeTruthy();
  });

  //Write tests to verify that clicking the "Increment" button increases the count and clicking the "Decrement" button decreases the count.

  //write test increment count
  it('should increment count', () => {
    const incrementButton = fixture.nativeElement.querySelector('button.increment-count');
    incrementButton.click();
    fixture.detectChanges();
    expect(component.count).toEqual(1);
  });

  //write test decrement count
  it('should decrement count', () => {
    const decrementButton = fixture.nativeElement.querySelector('button.decrement-count');
    decrementButton.click();
    fixture.detectChanges();
    expect(component.count).toEqual(-1);
  });

  //function test display correct count general
  function testDisplayCorrectCount(count: number) {
    component.count = count;
    fixture.detectChanges();
    const countElement = fixture.nativeElement.querySelector('p');
    expect(countElement.textContent).toContain(count);
  }

  //should simple display correct count
  it('should display correct count', () => {
    const count = 5;
    testDisplayCorrectCount(count);
  });

  //should display correct count when negative
  it('should display correct count when negative', () => {
    const count = -5;
    testDisplayCorrectCount(count);
  });
});
