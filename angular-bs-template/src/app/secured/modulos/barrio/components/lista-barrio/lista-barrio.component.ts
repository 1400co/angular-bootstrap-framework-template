import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Barrio } from 'src/app/models/barrio.model';
import { BarrioService } from 'src/app/services/barrio.service';

@Component({
  selector: 'app-lista-barrio',
  templateUrl: './lista-barrio.component.html',
  styleUrls: ['./lista-barrio.component.scss']
})
export class ListaBarrioComponent implements OnInit{

  barrios: Barrio[] =[];
  form:FormGroup;

 constructor(private barriosService: BarrioService,
  private formbuilder:FormBuilder,){

 }

  ngOnInit(): void {

    this.BuildForm();

    this.barriosService.getAllBarrios().subscribe(
      barrios => {
        this.barrios = barrios.data
      }
    );
  }

  private BuildForm(){
    this.form = this.formbuilder.group({
      codigo:['', []],
      nombreBarrio:['', []],
    })
  }

  Buscar(){
    this.barriosService.getBarrios(this.nameField,this.codigoField ,1 ,1 ).subscribe(
      barrios => {
        this.barrios = barrios.data
      }
    );
  }

  CargarMas(){

  }

  get codigoField():string {
    return this.form.get('codigo').value;
  }

  get nameField() {
    return this.form.get('nombreBarrio').value;
  }

}
