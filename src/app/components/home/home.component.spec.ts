import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { findComponent } from '../../spec-helpers/element.spec-helper';
import { CounterComponent } from '../counter/counter.component';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-counter',
  template: '',
})
class FakeCounterComponent implements Partial<CounterComponent> {
  @Input()
  public startCount = 0;

  @Output()
  public countChange = new EventEmitter<number>();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let counter: FakeCounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, FakeCounterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const counterEl = fixture.debugElement.query(
      By.directive(FakeCounterComponent)
    );
    counter = counterEl.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent counter', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    // const counter = findComponent(fixture, 'app-counter');
    expect(counter.startCount).toBe(5);
  });

  it('listens for count changes', () => {
    const logSpy = jest.spyOn(console, 'log');

    const counter = findComponent(fixture, 'app-counter');

    const count = 5;

    counter.triggerEventHandler('countChange', 5);

    expect(logSpy).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count
    );
  });

  it('renders a service counter', () => {
    const serviceCounter = findComponent(fixture, 'app-service-counter');
    expect(serviceCounter).toBeTruthy();
  });

  it('renders a NgRx counter', () => {
    const ngrxCounter = findComponent(fixture, 'app-ngrx-counter');
    expect(ngrxCounter).toBeTruthy();
  });

  it('renders an independent counter', () => {
    const counterEl = fixture.debugElement.query(
      By.directive(FakeCounterComponent)
    );
    const counter: CounterComponent = counterEl.componentInstance;

    expect(counter).toBeTruthy();
  });
});
