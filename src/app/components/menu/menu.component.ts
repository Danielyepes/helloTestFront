import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faPlusSquare = faPlusSquare;
  faTable = faTable;

  constructor() { }

  ngOnInit(): void {
  }

}
