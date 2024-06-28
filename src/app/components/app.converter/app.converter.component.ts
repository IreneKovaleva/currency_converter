import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormField, MatInput } from "@angular/material/input";
import { CurrenciesDataService } from "../../services/currency-data.service";
import { requestData } from "../../interfaces/currencies-data.interface";
import { ConversionDateService } from "../../services/convesrion-date.service";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from "rxjs";
import { MatRippleModule } from '@angular/material/core';


@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatRippleModule
  ],
  templateUrl: './app.converter.component.html',
  styleUrl: './app.converter.component.scss'
})
export class AppConverterComponent implements OnInit, OnDestroy{
  convert: requestData = {
    from_currency: "USD",
    to_currency: "UAH",
    amount: 1,
    date: ''
  }
  converted_amount_to: number = 0;
  converted_amount_from: number = 1;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private conversionType: string = 'from_currency_input';
  protected readonly Number = Number;

  constructor(
    private _currenciesDataService: CurrenciesDataService,
    private _conversionDateService: ConversionDateService,
  ) {}

  ngOnInit(): void {
    this._conversionDateService.$selectedDate
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
      if (data) {
        this.convert.date = data;
        this.performConversion();
      }
    });
  }
  onChangeCurrencyFrom(currency: string) {
    this.convert.from_currency = currency;
    this.performConversion();
  }
  onChangeCurrencyTo(currency: string) {
    this.convert.to_currency = currency;
    this.performConversion();
  }
  onInput(amount: number, type: string) {
    this.convert.amount = amount;
    this.conversionType = type;
    this.performConversion();
  }

  private performConversion() {
    this._currenciesDataService.getCurrenciesData(this.convert).subscribe(value => {
      if (value) {
        const currencyRate = parseFloat(value.rates[this.convert.to_currency].rate_for_amount);
        this.conversionType === "from_currency_input"
          ? this.converted_amount_to = currencyRate
          : this.converted_amount_from = currencyRate;
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
