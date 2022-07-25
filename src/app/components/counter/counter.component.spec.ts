import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dado o contador, quando for renderizado pela primeira vez, deve exibir o valor inicial', () => {
    const countOutput = debugElement.query(By.css('[data-testid="count"]'));

    expect(countOutput.nativeElement.textContent).toBe('0');
  })

  it('Dado o botão incrementar, quando for clicado, deve incrementar o valor do input', () => {
    const buttonIncrement = debugElement.query(By.css('[data-testid="increment-button"]'));

    const countOutput = debugElement.query(By.css('[data-testid="count"]'));

    buttonIncrement.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(countOutput.nativeElement.textContent).toBe('1');
  })

  it('Dado o botão decrementar, quando for clicado, deve decrementar o valor do input', ()=>{
    const buttonDecrement = debugElement.query(By.css('[data-testid="decrement-button"]'));

    const countOutput = debugElement.query(By.css('[data-testid="count"]'));

    buttonDecrement.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(countOutput.nativeElement.textContent).toBe('-1');
  })
});
