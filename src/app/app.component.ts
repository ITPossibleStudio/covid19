import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DeathsInterface } from './interfaces/deaths.interface';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  deathData: DeathsInterface;

  view: any[] = [600, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  // pie
  showLabels = true;


  public single = [
    {
      name: 'China',
      value: 2243772
    },
    {
      name: 'USA',
      value: 1126000
    },
    {
      name: 'Norway',
      value: 296215
    },
    {
      name: 'Japan',
      value: 257363
    },
    {
      name: 'Germany',
      value: 196750
    },
    {
      name: 'France',
      value: 204617
    }
  ];

  private subscription: Subscription = new Subscription();

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.initWorldData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initWorldData() {
    const world$ = this.searchService.getWorldData()
      .subscribe((data) => {
        this.deathData = data;
      });

    this.subscription.add(world$);
  }
}
