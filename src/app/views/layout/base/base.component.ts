import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../../pages/services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  @Output() changeLangRoot = new EventEmitter();
  isLoading: boolean;

  constructor(private router: Router, private transService: TranslateService) { 

    this.transService.setDefaultLang('es');
    // Spinner for lazyload modules
    this.router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });    
  }

  ngOnInit(): void {
   
  }

  changeLang(lang: string){
    this.transService.use(lang)
  }

}
