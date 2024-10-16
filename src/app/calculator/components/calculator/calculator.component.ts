import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService)

  calculatorButtons = viewChildren(CalculatorButtonComponent);

  resultText = computed(() => this.calculatorService.resultText());
  subResultText = computed(() => this.calculatorService.subResultText());
  lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      '/': '÷',
      X: '*',
      Escape: 'C',
      Clear: 'C',
      Enter: '='
    }

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });

  }

}
