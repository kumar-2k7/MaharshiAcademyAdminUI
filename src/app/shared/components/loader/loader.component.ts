import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  display = [];
  constructor(private loader: LoaderService) {
    loader.getLoaderValue().subscribe(value => {
      if (value === true) {
        this.display.push(value);
      } else if (value === null) {
        this.display = [];
      } else {
        this.display.pop();
      }
    })
  }

  ngOnInit() {
  }

}
