import { Component, OnInit } from '@angular/core';
import * as environment from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  row;


  constructor() {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    // Decalring the Different Variable and Objects
    const newCases = document.getElementById('new_case');
    const newDeath = document.getElementById('new_death');
    const totalDeath = document.getElementById('total_death');
    const totalRecovered = document.getElementById('total_recovered');
    const totalCases = document.getElementById('total_cases');
    const table = document.getElementById('countries_stat') as any;
    // Fetching the Data from the server

    // Fetching the World Data
    fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', {
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': environment.env.host,
        'x-rapidapi-key': environment.env.key
      }
    })
      .then(response => response.json().then( data => {
        console.log(data);
        totalCases.innerHTML = data.total_cases;
        newCases.innerHTML = data.new_cases;
        newDeath.innerHTML = data.new_deaths;
        totalDeath.innerHTML = data.total_deaths;
        totalRecovered.innerHTML = data.total_recovered;

      })).catch(err => {
      console.log(err);
    });

    // Fetching The Case by Country Data
    fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': environment.env.host,
        'x-rapidapi-key': environment.env.key
      }
    })
      .then(response => response.json().then( (data) => {
        console.log(data);
        const countriesStat = data.countries_stat;
        // Getting all the country statistic using a loop
        for (let i = 0; i < countriesStat.length; i++) {
          console.log(countriesStat[i]);
          // we will start by inserting the new rows inside our table
          if (table) {
            this.row = table.insertRow(i + 1);
          }

          const countryName = this.row.insertCell(0);
          const cases = this.row.insertCell(1);
          const deaths = this.row.insertCell(2);
          const seriousCritical = this.row.insertCell(3);
          const recoveredPerCountry = this.row.insertCell(4);
          countryName.innerHTML = countriesStat[i].country_name;
          cases.innerHTML = countriesStat[i].cases;
          deaths.innerHTML = countriesStat[i].deaths;
          seriousCritical.innerHTML = countriesStat[i].serious_critical;
          recoveredPerCountry.innerHTML = countriesStat[i].total_recovered;

        }
      }))
      .catch(err => {
        console.log(err);
      });
  }
}
