import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceClient } from 'src/app/services/serviceClient';
import { faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  faPen = faPen;
  faTrash = faTrash;
  faStar = faStar;

  nombreService = '';
  idServiceToDelete = '';
  services: Array<Service>;

  constructor(private serviceClient : ServiceClient,
    private modalService: NgbModal) { }


  ngOnInit(): void {
    this.actualizarLista();
  }

  delete(id: any){
    this.serviceClient.deleteService(id)
    .subscribe(response =>{
      console.log(response);
      this.actualizarLista();
      this.modalService.dismissAll();
    });
  }

  open(content, idService, nombre) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.idServiceToDelete = idService;
    this.nombreService = nombre;
  }

  actualizarLista(){
    this.serviceClient.getServices().subscribe(response =>{
      console.log(response);
      this.services= response;
    });
  }

}
