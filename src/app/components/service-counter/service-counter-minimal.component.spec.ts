import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

import { click, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { CounterService } from './../../services/counter.service';
import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent: unit test with minimal Service logic', () => {
  const newCount = 456;

  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;
  let debugElement: DebugElement;

  let fakeCount$: BehaviorSubject<number>;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;

  beforeEach(async () => {
    fakeCount$ = new BehaviorSubject(0);

    fakeCounterService = {
      getCount(): Observable<number> {
        return fakeCount$;
      },
      increment(): void {
        fakeCount$.next(1);
      },
      decrement(): void {
        fakeCount$.next(-1);
      },
      reset(): void {
        fakeCount$.next(Number(newCount));
      },
    };

    jest.spyOn(fakeCounterService, 'getCount').mockImplementation();
    jest.spyOn(fakeCounterService, 'increment').mockImplementation();
    jest.spyOn(fakeCounterService, 'decrement').mockImplementation();
    jest.spyOn(fakeCounterService, 'reset').mockImplementation();

    await TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [
        { provide: CounterService, useValue: fakeCounterService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('', () => {
    const count = debugElement.query(By.css('[data-testid="count"]'));

    expect(count.nativeElement.textContent).toBe('0');
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  })

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');

    expect(fakeCounterService.reset).not.toHaveBeenCalled();
  });
});
