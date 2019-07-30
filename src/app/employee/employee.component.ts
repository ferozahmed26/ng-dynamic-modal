import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Output() actionController$ = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClickSubmit() {
    this.actionController$.emit({});
  }

}
