import {Component, OnDestroy, OnInit} from '@angular/core';

import { SearchService } from './service/search.service';
import { DeathsInterface } from './interfaces/deaths.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  row;
  deathData: DeathsInterface[];
  countryData: any;

  constructor(public searchService: SearchService) {
  }

  ngOnInit(): void {
    this.initWorldData();
    this.initCountryData();
  }

  ngOnDestroy(): void {
  }

  private initWorldData() {
    this.searchService.getWorldData()
      .subscribe((data) => this.deathData = data);
  }

  private initCountryData() {
    this.searchService.getCountryData()
      .subscribe( (data) => this.countryData = data);
  }
}
