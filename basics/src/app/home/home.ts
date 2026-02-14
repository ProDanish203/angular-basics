import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  message = signal('Hello, World!');

  keyUpHandler(event: KeyboardEvent) {
    console.log('keyUpHandler triggered:', event.key);
  }
}
