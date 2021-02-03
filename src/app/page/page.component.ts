import {Component, Input, OnInit} from '@angular/core';
import {StudentModel} from '../models/student-model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input() students: StudentModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
