import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from '../../pages/services/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean;

  constructor(private router: Router, private authService: AuthService) { 

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });

    

    
  }

  ngOnInit(): void {
   
  }

}
