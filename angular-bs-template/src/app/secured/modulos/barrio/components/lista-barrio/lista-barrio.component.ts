import { Component, OnInit } from '@angular/core';
import { Barrio } from 'src/app/models/barrio.model';
import { BarrioService } from 'src/app/services/barrio.service';

@Component({
  selector: 'app-lista-barrio',
  templateUrl: './lista-barrio.component.html',
  styleUrls: ['./lista-barrio.component.scss']
})
export class ListaBarrioComponent implements OnInit{

  barrios: Barrio[] =[];

 constructor(private barriosService: BarrioService){

 }

  ngOnInit(): void {
    this.barriosService.getAllBarrios().subscribe(
      barrios => {
        this.barrios = barrios.data
      }
    );
  }

}
