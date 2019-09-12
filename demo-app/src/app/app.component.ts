import { Component } from '@angular/core';
import { GetUrlStatusService } from './services/get-url-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  urlPath: string;

  constructor(private getUrlStatusService: GetUrlStatusService) {

  }

  inputEntered($event: any) {
    this.urlPath = $event.target.value;
    this.getUrlStatusService.getUrlStatus(this.urlPath).subscribe(res => {
      console.log(res.status);
    });
  }
}
