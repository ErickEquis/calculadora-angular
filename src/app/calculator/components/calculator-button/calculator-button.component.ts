import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
  }
})
export class CalculatorButtonComponent {

  isPressed = signal(false);
  onClick = output<string>();
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')

  isCommand = input(false, {
    transform: (value: string | boolean) => typeof value === 'string' ? value === '' : value,
  })

  isDoubleSize = input(false, {
    transform: (value: string | boolean) => typeof value === 'string' ? value === '' : value,
  })

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return
    }

    const value = this.contentValue()!.nativeElement.innerText
    this.onClick.emit(value.trim())
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100)
  }

}
