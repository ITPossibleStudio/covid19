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

  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<CountryInterface>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.initWorldData();
    this.initCountryData();
    this.initTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this.dataSource = new MatTableDataSource(this.countryData);
        console.log('DATA SOURSE: ', this.dataSource);
      });

    this.subscription.add(country$);
  }
}
