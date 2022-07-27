import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findComponent } from '../../spec-helpers/element.spec-helper';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent counter', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties['startCount']).toBe(5);
  });

  it('listens for count changes', () => {
    const logSpy = jest.spyOn(console, 'log');

    const counter = findComponent(fixture, 'app-counter');

    const count = 5;

    counter.triggerEventHandler('countChange', 5);


    expect(logSpy).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count,
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
});
