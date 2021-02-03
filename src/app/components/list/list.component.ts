import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceClient } from 'src/app/services/serviceClient';
import { faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  faPen = faPen;
  faTrash = faTrash;
  faStar = faStar;

  services: Array<Service>;

  constructor(private serviceClient : ServiceClient) { }


  ngOnInit(): void {
    this.serviceClient.getServices().subscribe(response =>{
      console.log(response)
      this.services= response;
    }, error =>{
      console.error(error);
    });
  }

}
