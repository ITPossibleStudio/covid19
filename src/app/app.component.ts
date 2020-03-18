import {Component, OnDestroy, OnInit} from '@angular/core';

import { Subscription } from 'rxjs';

import { CountryInterface } from './interfaces/country.interface';
import { DeathsInterface } from './interfaces/deaths.interface';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  deathData: DeathsInterface[];
  countryData: CountryInterface[];

  private subscription: Subscription = new Subscription();

  constructor(public searchService: SearchService) {
  }

  ngOnInit(): void {
    this.initWorldData();
    this.initCountryData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initWorldData() {
    const world$ = this.searchService.getWorldData()
      .subscribe((data) => this.deathData = data);

    this.subscription.add(world$);
  }

  private initCountryData() {
    const country$ = this.searchService.getCountryData()
      .subscribe( (data) => this.countryData = data);

    this.subscription.add(country$);
  }
}
