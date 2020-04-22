import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subscription } from 'rxjs';

import { CountryData } from '../interfaces/country-data.interface';
import { SearchService } from '../service/search.service';
import { CountryInterface } from '../interfaces/country.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isDataLoaded = false;
  countryData: CountryInterface;

  displayedColumns: string[] = ['id', 'country', 'cases', 'deaths', 'new_cases', 'new_deaths', 'recovered'];
  dataSource: MatTableDataSource<CountryData>;

  private subscription: Subscription = new Subscription();

  constructor(public searchService: SearchService) {
    this.initCountryData();
  }

  ngOnInit() {
  }

  initDataSource(data) {
    // Create 100 countries
    const countries = Array.from({length: 100}, (_, k: number) => {
      return this.createNewCountry(
        k + 1,
        data[k + 1].country_name,
        data[k + 1].cases,
        data[k + 1].deaths,
        data[k + 1].new_cases,
        data[k + 1].new_deaths,
        data[k + 1].total_recovered
      );
    });

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(countries);

    this.dataSource.paginator = this.paginator; // todo fix 'paginator' error

    if (this.dataSource) {
      console.log('dataSource', this.dataSource);
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new Country. */
  createNewCountry(
    id: number, country: string, cases: string, deaths: string, newCases: string, newDeaths: string, recovered: string
  ): CountryData {
    return {
      id: id.toString(),
      country,
      cases,
      deaths,
      new_cases: newCases,
      new_deaths: newDeaths,
      recovered
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
