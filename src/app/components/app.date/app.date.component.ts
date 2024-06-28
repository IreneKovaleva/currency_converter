import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConversionDateService } from "../../services/convesrion-date.service";
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.date.component.html',
  styleUrl: './app.date.component.scss',
  providers: [
    MatDatepickerModule,
  ]
})
export class AppDateComponent {

  readonly date = new FormControl(new Date());

  constructor(private _ConversionDateService: ConversionDateService) {}

  inputDateValue(date: string) {
    this._ConversionDateService.updateDate(date);
  }
}
