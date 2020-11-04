import { Component, OnInit, Renderer2 } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public isLoading: boolean;

  constructor(private renderer: Renderer2, private helperService: HelperService) { }

  ngOnInit(): void {
    this.helperService.getLoading().subscribe(result => {
      this.isLoading = result;
      if (result) {
        this.renderer.addClass(document.body, 'is-loading');
      } else {
        this.renderer.removeClass(document.body, 'is-loading');
      }
    });
  }

}
