import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServiceClient } from 'src/app/services/serviceClient';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  service : Service;

  valor : number;

  addServiceForm = this.formBuilder.group({
    nombre : ['',Validators.required],
    descripcion: ['',Validators.required],
    codigo: ['',Validators.required],
  });;

  constructor(private formBuilder: FormBuilder, private serviceClient: ServiceClient) {

  }

  ngOnInit(): void {
  }

  addService(){

    let  service = new Service();
    // obtenemos los valores
    service.nombre = this.addServiceForm.value.nombre;
    service.descripcion = this.addServiceForm.value.descripcion;
    service.codigo = this.addServiceForm.value.codigo;

    service.valor = this.valor;

    if (this.addServiceForm.valid){
      //enviamos el servicio al rest
      this.serviceClient.addServices(service)
      .subscribe(serviceResponse => {
        this.service = serviceResponse;
        console.log(this.service);
      });


    }else{
      //TODO: colocar en un mensaje que se envia a la vista
      console.log("Faltan campos por llenar");
    }
    this.addServiceForm.reset();
  }


  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {

      this.valor =  $event.newValue;
  }

}
