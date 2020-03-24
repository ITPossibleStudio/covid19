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

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

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

  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['id', 'country', 'cases', 'deaths', 'new_cases', 'new_deaths'];
  dataSource: MatTableDataSource<CountryData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public searchService: SearchService) {
    this.initCountryData();

    // Create 100 countries
    const countries = Array.from({length: 100}, (_, k) => this.createNewCountry(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(countries);
  }

  ngOnInit(): void {
    this.initWorldData();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new Country. */
  createNewCountry(id: number): CountryData {
    console.log('COUNTRY');
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id.toString(),
      country: name,
      cases: Math.round(Math.random() * 100).toString(),
      deaths: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
      new_cases: '1',
      new_deaths: '0'
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
        console.log(...this.countryData.countries_stat);
      });

    this.subscription.add(country$);
  }
}
