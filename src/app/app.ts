import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styles: [`
    main {
      min-height: calc(100vh - 64px);
      position: relative;
    }
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.7);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class App {
  protected readonly title = signal('travel-booking-explorer');
  loadingService = inject(LoadingService);
}
