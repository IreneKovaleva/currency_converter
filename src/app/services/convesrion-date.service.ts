import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ConversionDateService {

  today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor() {}

  private date = new BehaviorSubject(this.today);

  $selectedDate = this.date.asObservable();

  updateDate(newDate: string) {
    const [month, day, year] = newDate.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    this.date.next(formatDate(new Date(formattedDate), 'yyyy-MM-dd', 'en'));
  }
}
