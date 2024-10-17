import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

// Simulacion de CalculatorService
class MockCalculatorService {
  resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let mockCalculatorService: MockCalculatorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      // Inyeccion de Mock
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the init values', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  })

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')!.innerText).toBe('456 *')

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  })

  it('should have 19 calculator-button', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons).toBeTruthy();
    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent!.trim()).toBe('C');
    expect(buttons[1].textContent!.trim()).toBe('+/-');
    expect(buttons[2].textContent!.trim()).toBe('%');
    expect(buttons[3].textContent!.trim()).toBe('÷');
  })

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=')
  })

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    expect(compiled.querySelector('span')?.textContent).toContain('456 *');
  })
});
