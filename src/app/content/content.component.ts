import {Component, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {StudentModel} from '../models/student-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnDestroy {
  keyPressCount = 0;

  params = {
    page: 1,
    sortBy: 'name',
    reverseSort: false,
    search: ''
  };

  students: StudentModel[];
  studentSubscription: Subscription;

  constructor(private dataService: DataService) {
  }
  // Fetches students from backend using the params object as query parameters
  // and sets local students array
  fetchStudents(): void {
    this.studentSubscription = this.dataService
      .fetchItems(this.params)
      .subscribe(fetchedStudents => {
        this.students = fetchedStudents;
      });
  }
  // Handles fast typing by setting a timeout and compares
  // the pressed key count after 2000ms
  onKeyUp(): void {
    this.keyPressCount++;
    const keyCountToCheck = this.keyPressCount;
    setTimeout(() => {
      if (keyCountToCheck === this.keyPressCount && this.isValid()) {
        this.params.page = 1;
        this.fetchStudents();
      }
    }, 2000, keyCountToCheck);
  }
  // Fetches next page of students if there are any
  // by incrementing page parameter of params object
  // if no students available decrements the page parameter
  nextPage(): void {
    if (!(this.students && this.students.length < 5)) {
      this.params.page++;
      this.studentSubscription = this.dataService
        .fetchItems(this.params)
        .subscribe(fetchedStudents => {
          fetchedStudents.length !== 0 ? this.students = fetchedStudents : this.params.page--;
        });
    }
  }
  // Fetches previous page of students if there are any
  // by decrementing page parameter of params object
  // if no students available increments the page parameter
  previousPage(): void {
    if (this.students && this.params.page > 1) {
      this.params.page--;
      this.studentSubscription = this.dataService
        .fetchItems(this.params)
        .subscribe(fetchedStudents => {
          fetchedStudents.length !== 0 ? this.students = fetchedStudents : this.params.page++;
        });
    }
  }
  // Handles the sorting by comparing clicked method
  // sorts in reverse when clicked 2nd time
  onSort(sort: string): void {
    this.params.sortBy === sort ?
      this.params.reverseSort = !this.params.reverseSort : this.params.sortBy = sort;
    this.params.page = 1;
    this.fetchStudents();
  }
  // Handles search button's onClick event
  onClick(): void {
    this.fetchStudents();
    this.params.page = 1;
  }
  // Handles input validation
  isValid(): boolean {
    return this.params.search && this.params.search.length > 2;
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
  }
}
