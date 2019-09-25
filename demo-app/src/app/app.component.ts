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
  getHostname = (): string => {
    const match = this.input.match(/(https?:\/\/)?(www[0-9]?\.)?(.[^/:]+\/)/i);
    if (match != null && match.length > 2 && typeof match[0] === 'string' && match[0].length > 0) {
      return match[0];
    } else {
      return null;
    }

  }

  loadData() {
    if (this.prevValue !== undefined && this.result.length > 0 && this.prevValue !== this.input) {
      this.resetSearch();
    }

    const hostName = this.getHostname();
    console.log('hostName: ', hostName);
    const searchInp = hostName !== null ? this.input.split(hostName)[1] : this.input;
    console.log(searchInp);


    if (this.input.length > 0) {
      // tslint:disable-next-line: max-line-length
      this.getUrlStatusService.getUrlStatus(this.sitesList.googleapilink + '&q=' + searchInp + '&start=' + this.startIndex).subscribe(res => {
        if (res.body.items !== undefined) {
          res.body.items.forEach(element => {
            this.result.push(element.link);
          });
          this.startIndex = res.body.queries.nextPage !== undefined ? res.body.queries.nextPage[0].startIndex : 1;
          if (res.body.queries.nextPage !== undefined && +res.body.searchInformation.totalResults > 10) {
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
