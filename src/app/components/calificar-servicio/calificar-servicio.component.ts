import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Calificacion } from 'src/app/models/calificacion';
import { Service } from 'src/app/models/service';
import { ServiceClient } from 'src/app/services/serviceClient';

@Component({
  selector: 'app-calificar-servicio',
  templateUrl: './calificar-servicio.component.html',
  styleUrls: ['./calificar-servicio.component.css']
})
export class CalificarServicioComponent implements OnInit {

  calificacion : Calificacion;

  service : Service;

  idService : number;

  valor : number;

  addServiceForm = this.formBuilder.group({
    nombre : ['',Validators.required],
    correo: ['',Validators.required],
  });;

  constructor(private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceClient: ServiceClient) {}

  ngOnInit(): void {

    this.idService = this.router.snapshot.params["id"];
    console.log("id="+ this.idService);


  }

  addService(){

    let  calificacion = new Calificacion();
    // obtenemos los valores
    calificacion.nombre = this.addServiceForm.value.nombre;
    calificacion.correo = this.addServiceForm.value.correo;

    calificacion.valor = this.valor;

    if (this.addServiceForm.valid){
      //enviamos el servicio al rest
      this.serviceClient.addCalification(calificacion,this.idService)
      .subscribe(serviceResponse => {
        this.calificacion = serviceResponse;
        console.log(this.calificacion);

        this.serviceClient.getService(this.idService + "").
        subscribe(response => {
          this.service = response;
          console.log(this.service)
        });
        //TODO CAlcular promedio y luego actualizar el atributo

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
