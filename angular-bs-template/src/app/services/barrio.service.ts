import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { checkToken } from '../interceptor/token-interceptor';
import { CustomApiResponse } from '../models/api-response';
import { Barrio } from '../models/barrio.model';


@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  apiUrl = environment.API_URL;

  constructor( private http: HttpClient,
    private tokenService: TokenService) {

   }

   getAllBarrios() {
    return this.http.get<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio`,{ context: checkToken() });
  }

  getBarrios(nombreBarrio: string, codigo: string,pageNumber : number,pageSize : number  ) {
    const params = {
      NombreBarrio: nombreBarrio,
      codigo: codigo,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    console.log("parametros", params)
    return this.http.get<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio`,{ params, context:checkToken() });
  }

  getBarrio(id: string) {
    return this.http.get<CustomApiResponse<Barrio>>(`${environment.API_URL}barrio/${id}`,{  context:checkToken() });
  }

  CrearBarrio(barrioDto: Barrio) {
    return this.http.post<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio`, {...barrioDto, 'ResponsableId': this.tokenService.getTokenId()});
  }

  ActualizarBarrio(id: number,  barrioDto: Barrio) {
    return this.http.put<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio?id=${id}`, {...barrioDto, 'ResponsableId': this.tokenService.getTokenId()});
  }

  BorrarBarrio(id: number,  barrioDto: Barrio) {
    return this.http.put<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio/borrar?id=${id}`, {...barrioDto, 'ResponsableId': this.tokenService.getTokenId()});
  }
}
