import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Service } from 'src/app/models/service';
import { ServiceClient } from 'src/app/services/serviceClient';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id : string;

  service :Service;

  valor : number = undefined;

  addServiceForm = this.formBuilder.group({
    nombre : ['',Validators.required],
    descripcion: ['',Validators.required],
    codigo: ['',Validators.required],
  });;


  constructor(private router: ActivatedRoute,
    private formBuilder: FormBuilder,
      private serviceClient: ServiceClient) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    console.log("id="+ this.id);

    this.serviceClient.getService(this.id).
    subscribe(response => {
      this.service = response;
      this.addServiceForm.setValue({
        nombre : this.service.nombre,
        descripcion: this.service.descripcion,
        codigo: this.service.codigo,
      })
    });

  }

  updateService(){

    let  service = new Service();
    // obtenemos los valores
    service._id = this.service._id;
    service.nombre = this.addServiceForm.value.nombre;
    service.descripcion = this.addServiceForm.value.descripcion;
    service.codigo = this.addServiceForm.value.codigo;

    if(this.valor == undefined ){
      service.valor = this.service.valor;
    }else{
      service.valor = this.valor;
    }

    if (this.addServiceForm.valid){
      console.log(service);
      //enviamos el servicio al rest
      this.serviceClient.updateService(service)
      .subscribe(serviceResponse => {
        this.processResponse(serviceResponse);
      });


    }else{
      //TODO: colocar en un mensaje que se envia a la vista
      console.log("Faltan campos por llenar");
    }
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.valor =  $event.newValue;
  }

  processResponse(serviceResponse: any){
    if(serviceResponse){
      console.log("Se modifico "+ serviceResponse.nModified + "registro");
    }
  }

}

