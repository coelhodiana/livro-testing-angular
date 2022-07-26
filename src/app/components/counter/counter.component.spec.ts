import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs';

import { click, expectText, findEl, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;
  const startCount = 123;
  const newCount = 123;

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

  // it('Dado o reset-input, quando o valor for incrementado, então countChange deve emitir o novo valor', () => {
  //   let actualCount: number | undefined;

  //   component.countChange.subscribe({
  //     next: (count: number) => {
  //       actualCount = count;
  //     }
  //   })

  //   click(fixture, 'increment-button');

  //   expect(actualCount).toBe(124);
  // });

  // it('Dado o reset-input, quando o valor for decrementado, então countChange deve emitir o novo valor', () => {
  //   let actualCount: number | undefined;

  //   component.countChange.subscribe({
  //     next: (count: number) => {
  //       actualCount = count;
  //     }
  //   })

  //   click(fixture, 'decrement-button');

  //   expect(actualCount).toBe(122);
  // });

  // it('Dado o reset-input, quando o valor for resetado, então countChange deve emitir o novo valor', () => {
  //   const newCount = 123;

  //   let actualCount: number | undefined;
  //   component.countChange.subscribe({
  //     next: (count: number) => {
  //       actualCount = count;
  //     }
  //   })

  //   setFieldValue(fixture, 'reset-input', String(newCount))
  //   click(fixture, 'reset-button');

  //   expect(actualCount).toBe(newCount);
  // });

  it('Dado o reset-input, quando o count for atualizado, deve disparar o countChange', () => {

    let actualCounts: number[] | undefined;

    component.countChange.pipe(
      take(3),
      toArray()
    ).subscribe({
      next: (counts) => {
        actualCounts = counts;
      }
    });

    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    expect(actualCounts).toEqual([startCount + 1, startCount, newCount]);
  })
});
