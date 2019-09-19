import { Component, ViewChild } from '@angular/core';
import { GetUrlStatusService } from './services/get-url-status.service';
import { SitesList } from './Models/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  urlPath: string;
  result = [];
  sitesList = new SitesList();
  input = '';
  showMore: boolean;
  startIndex = 1;
  prevValue: string;
  noResultFound: boolean;
  // @ViewChild('inputBar') inputBar: any;

  constructor(private getUrlStatusService: GetUrlStatusService) {

  }

  onKey(event: any) {
    this.input += event.target.value;
    if (this.input.length === 0) {
      this.resetSearch();
    }
  }

  loadData() {
    if (this.prevValue !== undefined && this.result.length > 0 && this.prevValue !== this.input) {
      this.resetSearch();
    }
    if (this.input.length > 0) {
      // tslint:disable-next-line: max-line-length
      this.getUrlStatusService.getUrlStatus(this.sitesList.googleapilink + '&q=' + this.input + '&start=' + this.startIndex).subscribe(res => {
        if (res.body.items !== undefined) {
          res.body.items.forEach(element => {
            this.result.push(element.link);
          });
          // this.result += res.body.items;
          this.startIndex = res.body.queries.nextPage[0].startIndex;
          if (+res.body.searchInformation.totalResults > 10) {
            this.showMore = true;
          }
        } else {
          this.noResultFound = true;
        }
      });
      this.prevValue = this.input;
    }
  }

  resetSearch() {
    this.startIndex = 1;
    this.result = [];
    this.showMore = false;
  }
}
