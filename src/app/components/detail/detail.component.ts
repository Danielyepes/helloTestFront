import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private router: ActivatedRoute,
      private serviceClient: ServiceClient) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    console.log("id="+ this.id);

    this.serviceClient.getService(this.id).
    subscribe(response => {
      console.log(response);
      this.service = response;
    });

  }


}

