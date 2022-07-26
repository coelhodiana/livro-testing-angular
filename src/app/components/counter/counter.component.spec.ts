import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { click, expectText, findEl, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;
  const startCount = 123;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dado o contador, quando for renderizado pela primeira vez, deve exibir o valor inicial', () => {
    findEl(fixture, 'count');

    expectText(fixture, 'count', String(startCount));
  });

  it('Dado o botão incrementar, quando for clicado, deve incrementar o valor do input', () => {
    click(fixture, 'increment-button');

    fixture.detectChanges();

    expectText(fixture, 'count', String(startCount + 1));
  });

  it('Dado o botão decrementar, quando for clicado, deve decrementar o valor do input', () => {
    click(fixture, 'decrement-button');

    fixture.detectChanges();

    expectText(fixture, 'count', String(startCount - 1));
  });

  it('Dado o resetInput, quando for preenchido com um valor e o botão reset for clicado, então o valor de count deve ser o valor fornacido ', () => {
    setFieldValue(fixture, 'reset-input', '123');

    click(fixture, 'reset-button');

    fixture.detectChanges();

    expectText(fixture, 'count', '123');
  });

  it('Dado o resetInput, quando preenchido com NaN e o botão reset for clicado, então o valor de count deve permanecer inalterado', () => {

    const value = 'NaN';

    setFieldValue(fixture, 'reset-input', value);

    click(fixture, 'reset-button');

    fixture.detectChanges();

    expectText(fixture, 'count', String(startCount));

  });
});
