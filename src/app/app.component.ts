import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FetchApiService } from './services/fetch-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private destroy$ = new Subject<void>();

  title = 'Demo-UnitTest-Angular';
  isOn = false;
  constructor(private fetchApiService: FetchApiService) {
  }

  ngOnInit() {
    this.fetchApiService.fetchData().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.fetchApiService = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onClick() {
    this.isOn = !this.isOn;
  }
  get message() { return `The light is ${this.isOn ? 'On' : 'Off'}`; }

}
