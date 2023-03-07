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
    // const cheaders = new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200')
    // .set('Access-Control-Allow-Credentials', 'true');

    return this.http.get<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio`,{ context: checkToken() });
  }

  CrearBarrio(barrioDto: Barrio) {
    console.log("service", barrioDto)
    return this.http.post<CustomApiResponse<Barrio[]>>(`${environment.API_URL}barrio`, {...barrioDto, 'ResponsableId': this.tokenService.getTokenId()});
  }

}
