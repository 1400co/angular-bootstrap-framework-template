import { TokenService } from './../../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  userName:string ="";

  constructor(private location: Location,
    private tokenService: TokenService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.userName = this.tokenService.getTokenUserName();
  }

  Volver(){
    this.location.back();
  }

  Salir(){
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.tokenService.removeTokenId();
    this.tokenService.removeTokenUserName();
    this.router.navigate(['/login']);
  }
}
