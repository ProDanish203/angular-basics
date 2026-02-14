import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  value = signal(0);

  increment() {
    this.value.update((v) => v + 1);
  }
  decrement() {
    this.value.update((v) => {
      if (v === 0) return 0
      return v - 1
    });
  }
  reset() {
    this.value.set(0);
  }
  isDisabled() {
    return this.value() === 0;
  }
}
