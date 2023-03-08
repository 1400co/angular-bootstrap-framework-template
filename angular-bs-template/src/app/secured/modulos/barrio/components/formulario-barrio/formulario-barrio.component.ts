import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { BarrioService } from 'src/app/services/barrio.service';

@Component({
  selector: 'app-formulario-barrio',
  templateUrl: './formulario-barrio.component.html',
  styleUrls: ['./formulario-barrio.component.scss']
})
export class FormularioBarrioComponent {

// form = new FormGroup({
//   codigo:new FormControl('', [Validators.required]),
//   nombre:new FormControl('', [Validators.required]),
// })
form:FormGroup;
statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

constructor(
  private formbuilder:FormBuilder,
  private barriosService: BarrioService
){
  this.BuildForm();
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

Eliminar()
{
  if(this.form.invalid)
  {
    this.form.markAllAsTouched();
    return;
  }
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
