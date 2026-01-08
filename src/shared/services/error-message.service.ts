import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  showMessage(message: string) {
    this._error.set(message);

    // Auto-clear after 5 seconds
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  showServerError() {
    this.showMessage(
      'A server error occurred or the service is unavailable. Please try again later.',
    );
  }

  clear() {
    this._error.set(null);
  }
}
