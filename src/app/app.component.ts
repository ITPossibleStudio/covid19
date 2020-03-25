import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subscription } from 'rxjs';

import { CountryInterface } from './interfaces/country.interface';
import { DeathsInterface } from './interfaces/deaths.interface';
import { SearchService } from './service/search.service';

export interface CountryData {
  id: string;
  country: string;
  cases: string;
  deaths: string;
  new_cases: string;
  new_deaths: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  deathData: DeathsInterface[];
  countryData: CountryInterface;
  isDataLoaded = false;

  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['id', 'country', 'cases', 'deaths', 'new_cases', 'new_deaths'];
  dataSource: MatTableDataSource<CountryData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public searchService: SearchService) {
    this.initCountryData();
  }

  ngOnInit(): void {
    this.initWorldData();

    // this.dataSource.paginator = this.paginator; // todo fix 'paginator' error
    // this.dataSource.sort = this.sort;
  }

  initDataSource(data) {
    console.log('DATA: ', data);
    // Create 100 countries
    const count = data.length;
    console.log(count); // todo use 'count' for generate countries array

    const countries = Array.from({length: 100}, (_, k: number) => {
      return this.createNewCountry(
        k + 1,
        data[k + 1].country_name,
        data[k + 1].cases,
        data[k + 1].deaths,
        data[k + 1].new_cases,
        data[k + 1].new_deaths,
      );
    });

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(countries);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new Country. */
  createNewCountry(id: number, country: string, cases: string, deaths: string, newCases: string, newDeaths: string): CountryData {
    return {
      id: id.toString(),
      country,
      cases,
      deaths,
      new_cases: newCases,
      new_deaths: newDeaths
    };
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
        this.isDataLoaded = true;
        this.initDataSource([...this.countryData.countries_stat]);
      });

    this.subscription.add(country$);
  }
}
