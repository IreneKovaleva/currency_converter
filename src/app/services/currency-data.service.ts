import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { requestData } from "../interfaces/currencies-data.interface";

@Injectable({
  providedIn: 'root'
})

export class CurrenciesDataService {
  constructor(private _httpClient: HttpClient) {}

  getCurrenciesData(req: requestData): Observable<any> {
    const host = 'https://api.getgeoapi.com/v2/currency/historical';
    const apiKey = '6821af555b0b4aa1fa9fcb34a238d498b985ff59';

    return this._httpClient.get(`${host}/${req.date}?api_key=${apiKey}&from=${req.from_currency}&to=${req.to_currency}&amount=${req.amount}&format=json`);
  }
}
