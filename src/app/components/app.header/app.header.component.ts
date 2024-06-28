import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrenciesDataService } from '../../services/currency-data.service';
import { requestData } from "../../interfaces/currencies-data.interface";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [],
  templateUrl: './app.header.component.html',
  styleUrl: './app.header.component.scss'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  todayDate: string;
  usd_rate: number = 0;
  eur_rate: number = 0;
  usd_currency!: requestData;
  eur_currency!: requestData;

  private subscriptions: Subscription = new Subscription();

  constructor(private _CurrenciesDataService: CurrenciesDataService) {
    this.todayDate = this.getTodayDate();
  }

  getTodayDate(): string {
    const today = new Date();
    return formatDate(today, 'yyyy-MM-dd', 'en');
  }

  ngOnInit() {
    this.usd_currency = {
      from_currency: "USD",
      to_currency: "UAH",
      amount: 1,
      date: this.todayDate
    };

    this.eur_currency = {
      from_currency: "EUR",
      to_currency: "UAH",
      amount: 1,
      date: this.todayDate
    };

    this._CurrenciesDataService.getCurrenciesData(this.usd_currency).subscribe(value => {
      if (value) {
        this.usd_rate = value.rates.UAH.rate;
      }
    });

    this._CurrenciesDataService.getCurrenciesData(this.eur_currency).subscribe(value => {
      if (value) {
        this.eur_rate = value.rates.UAH.rate;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
