import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { ErrorMessageService } from '../shared/services/error-message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('delifhery-gui');
  protected readonly errorMessageService = inject(ErrorMessageService);
}
