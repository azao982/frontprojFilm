import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detailsfilms',
  templateUrl: './detailsfilms.component.html',
  styleUrls: ['./detailsfilms.component.css']
})
export class DetailsfilmsComponent {
  @Input() selectedFilm: any;
}
