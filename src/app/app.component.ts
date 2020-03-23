import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public searchService: SearchService) {
    this.initCountryData();
  }

  ngOnInit(): void {
    this.initWorldData();
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
      .subscribe( (data) => {
        this.countryData = data;
      });

    this.subscription.add(country$);
  }
}
