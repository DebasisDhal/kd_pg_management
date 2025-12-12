import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Common } from "./pages/common/common";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Common],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kd_pg_management');
}
