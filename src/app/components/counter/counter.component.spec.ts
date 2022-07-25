import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { click, expectText, findEl } from '../../spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
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
    findEl(fixture, 'count');

    expectText(fixture, 'count', '0');
  });

  it('Dado o botão incrementar, quando for clicado, deve incrementar o valor do input', () => {
    click(fixture, 'increment-button');

    fixture.detectChanges();

    expectText(fixture, 'count', '1');
  });

  it('Dado o botão decrementar, quando for clicado, deve decrementar o valor do input', () => {
    click(fixture, 'decrement-button');

    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
  });
});
