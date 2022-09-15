import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() countries$!: Observable<Country[]>;
  @Input() searchTerm!: string;

  constructor() {}

  ngOnInit(): void {}
}
