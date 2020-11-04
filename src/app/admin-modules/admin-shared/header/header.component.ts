import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetail: any;

  constructor(private renderer: Renderer2, private authService: AuthService) { }

  ngOnInit(): void {
    this.userDetail = this.authService.currentUser
  }

  toggleSidebar() {
    const selectDOM = document.getElementById("wrapper");
    if (selectDOM.classList.contains('toggled')) {
      this.renderer.removeClass(selectDOM, 'toggled');
    } else {
      this.renderer.addClass(selectDOM, 'toggled');
    }
  }

}
