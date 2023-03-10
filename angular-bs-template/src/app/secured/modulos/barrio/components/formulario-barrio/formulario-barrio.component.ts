import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarrioService } from 'src/app/services/barrio.service';

@Component({
  selector: 'app-formulario-barrio',
  templateUrl: './formulario-barrio.component.html',
  styleUrls: ['./formulario-barrio.component.scss']
})
export class FormularioBarrioComponent implements OnInit {


form:FormGroup;
id: string;
statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

constructor(
  private formbuilder:FormBuilder,
  private barriosService: BarrioService,
  private activatedRoute: ActivatedRoute,
  private modalService: NgbModal,
  private router: Router
){
  this.BuildForm();
}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.barriosService.getBarrio(this.id)
      .subscribe(product => {
        this.form.patchValue(product.data);
      });
    });
  }

private BuildForm(){
  this.form = this.formbuilder.group({
    codigo:['', [Validators.required]],
    nombre:['', [Validators.required]],
  })
}

Guardar()
{
  if(this.form.invalid)
  {
    this.form.markAllAsTouched();
    return;
  }
  console.log("Valor a guardar", this.form.value);
  this.barriosService.CrearBarrio(this.form.value).subscribe(
    (data) => {
      this.statusDetail = 'success';
      this.CleanForm();
    },
    (errorMsg) => {
      this.statusDetail = 'error';
    }
  );
}

Actualizar()
{
  if(this.form.invalid)
  {
    this.form.markAllAsTouched();
    return;
  }
  this.barriosService.ActualizarBarrio(parseInt(this.id), this.form.value).subscribe(
    (data) => {
      this.statusDetail = 'success';
      this.CleanForm();
    },
    (errorMsg) => {
      this.statusDetail = 'error';
    }
  );
}

Eliminar(content)
{
  this.modalService.open(content);
}

Borrar()
{
  if(this.form.invalid)
  {
    this.form.markAllAsTouched();
    return;
  }
  this.barriosService.BorrarBarrio(parseInt(this.id), this.form.value).subscribe(
    (data) => {
      this.statusDetail = 'success';
      this.router.navigate(['/secured/barrios']);
    },
    (errorMsg) => {
      this.statusDetail = 'error';
    }
  );
}

get isFormInValid() {
  return this.form.invalid && this.form.touched;
}

get nameField() {
  return this.form.get('nombre');
}

get isNombreFieldValid() {
  return this.nameField.touched && this.nameField.valid;
}

get codigoField() {
  return this.form.get('codigo');
}

get isCodigoFieldValid() {
  return this.codigoField.touched && this.codigoField.valid;
}

private CleanForm(){
  this.form.reset();
}

}
