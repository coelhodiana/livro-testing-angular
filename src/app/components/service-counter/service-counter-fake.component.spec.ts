import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CounterService } from '../../services/counter.service';
import { click, expectText, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent: unit test', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  const currentCount = 0;

  const fakeCounterService: Pick<CounterService, keyof CounterService> =  {
    getCount: jest.fn().mockReturnValue(of(currentCount)),
    increment: jest.fn(),
    decrement: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the count', () => {
    expectText(fixture, 'count', String(currentCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});

