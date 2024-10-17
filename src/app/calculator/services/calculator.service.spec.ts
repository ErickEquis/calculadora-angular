import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values', () => {
    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('0');
    expect(service.resultText()).toBe('0');
  })

  it('should restart default valus to lastOperator subResultText and resultText', () => {
    service.subResultText.set('123');
    service.resultText.set('456');
    service.lastOperator.set('/');

    service.constructNumber('C');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('0');
    expect(service.resultText()).toBe('0');
  })

  it('should calculate result correctly for addition', () => {
    service.constructNumber('2');
    service.constructNumber('+');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('7');
  })

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('2');
    service.constructNumber('-');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-3');
  })

  it('should calculate result correctly for divition', () => {
    service.constructNumber('4');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  })

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('10');
  })


});
