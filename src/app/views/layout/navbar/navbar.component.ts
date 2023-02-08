import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from 'src/app/interfaces/auth-class';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  @Output() changeLang: EventEmitter<string> = new EventEmitter<string>();

  public userDTO: UserDTO | null;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router, private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.userDTO = user;
    });
  }

  changueLang(value: string) {
    console.log(value)
    this.changeLang.emit(value);
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
