import {Component, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {StudentModel} from '../models/student-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

// To run node and angular simultaneously I used proxy configuration
// ng serve --proxy-config proxy-conf.json

export class ContentComponent implements OnDestroy {
  keyPressCount = 0; // To handle fast typing
  scrollCount = 0; // To handle fast scrolling

  params = {
    index: 0,
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
  // when no keypresses detected resets the index and fetches
  onKeyUp(): void {
    this.keyPressCount++;
    const keyCountToCheck = this.keyPressCount;
    setTimeout(() => {
      if (keyCountToCheck === this.keyPressCount && this.isValid()) {
        this.params.index = 0;
        this.fetchStudents();
      }
    }, 2000, keyCountToCheck);
  }

  // Handles the sorting by comparing clicked method
  // sorts in reverse when clicked 2nd time
  // resets index and fetches
  onSort(sort: string): void {
    this.params.sortBy === sort ?
      this.params.reverseSort = !this.params.reverseSort : this.params.sortBy = sort;
    this.params.index = 0;
    this.fetchStudents();
  }

  // Handles search button's onClick event
  onClick(): void {
    this.params.index = 0;
    this.fetchStudents();
  }

  // Handles fast scrolling. Increments scrollCount on every scroll
  // Sets a 1 second timeout, and after that checks for scroll count equality
  // When equal resets scroll count and runs scrollUp or scrollDown
  // depending on scroll direction, and passes the scrollCount
  scroll($event: WheelEvent): void {
    this.scrollCount++;
    const scrollToCheck = this.scrollCount;
    setTimeout(() => {
      if (scrollToCheck === this.scrollCount) {
        $event.deltaY === 100 ? this.scrollDown(this.scrollCount) : this.scrollUp(this.scrollCount);
        this.scrollCount = 0;
      }
    }, 1000, scrollToCheck);

  }

  // Fetches Students depending on scroll count
  scrollDown(times: number): void {
    this.params.index += times;
    this.studentSubscription = this.dataService
      .fetchItems(this.params)
      .subscribe(fetchedStudents => {
        this.students = fetchedStudents;
      });
  }

// Fetches Students depending on scroll count
  scrollUp(times: number): void {
    if (this.params.index > 0) {
      this.params.index -= times;
      this.studentSubscription = this.dataService
        .fetchItems(this.params)
        .subscribe(fetchedStudents => {
          this.students = fetchedStudents;
        });
    }
  }

  // Handles input validation
  // Valid are inputs that contain more than 2 characters
  isValid(): boolean {
    return this.params.search.length > 2;
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
  }
}
