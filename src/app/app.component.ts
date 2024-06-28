import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppHeaderComponent} from "./components/app.header/app.header.component";
import {AppDateComponent} from "./components/app.date/app.date.component";
import {AppConverterComponent} from "./components/app.converter/app.converter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppDateComponent, AppConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'currency_converter';
}
