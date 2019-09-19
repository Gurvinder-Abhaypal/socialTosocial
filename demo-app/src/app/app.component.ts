import { Component, ViewChild } from '@angular/core';
import { GetUrlStatusService } from './services/get-url-status.service';
import { SitesList } from './Models/social-sites-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  urlPath: string;
  result: any;
  sitesList = new SitesList();
  input = '';
  // @ViewChild('inputBar') inputBar: any;

  constructor(private getUrlStatusService: GetUrlStatusService) {

  }

  onKey(event: any) {
    this.input += event.target.value;
  }

  onSubmit() {
    this.getUrlStatusService.getUrlStatus(this.sitesList.googleapilink + '&q=' + this.input).subscribe(res => {
      this.result = res.body.items;
    },() => {}, () => {
      this.input = '';
    });
  }
}
