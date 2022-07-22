import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(

    /**
    * Uses Inject to retrieve data from the movie object
    * @param data
    */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
