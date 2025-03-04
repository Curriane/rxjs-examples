import { Component } from '@angular/core';
import { RxjsDemoService } from '../../services/rxjs-demo.service';

@Component({
  selector: 'app-rxjs-examples',
  standalone: false,
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.css'
})
export class RxjsExamplesComponent {
  selectedCategory: string = '';
  showOperators: boolean = false;

  constructor(private rxjsDemo: RxjsDemoService) { }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.showOperators = true;
  }

  // 根據所選類別顯示對應的操作符
  getOperators(): string[] {
    switch (this.selectedCategory) {
      case 'creation':
        return ['empty', 'of'];
      case 'joinCreation':
        return ['combineLatest', 'forkJoin', 'zip'];
      case 'transformation':
        return ['concatMap', 'switchMap', 'mergeMap'];
      case 'filtering':
        return ['filter', 'skip', 'takeUntil'];
      case 'join':
        return ['concatAll', 'mergeAll', 'switchAll', 'startWith'];
      case 'utility':
        return ['tap'];
      case 'conditional':
        return ['every'];
      case 'subject':
        return ['subject', 'behaviorSubject'];
      default:
        return [];
    }
  }

  // 根據選擇的操作符執行對應的示範
  runExample(operator: string): void {
    console.clear(); // 清除之前的控制台輸出
    switch (operator) {
      // Creation Operators
      case 'empty':
        this.rxjsDemo.demonstrateEmptyOperator();
        break;
      case 'of':
        this.rxjsDemo.demonstrateOfOperator();
        break;
      
      // Join Creation Operators
      case 'combineLatest':
        this.rxjsDemo.demonstrateCombineLatestOperator();
        break;
      case 'forkJoin':
        this.rxjsDemo.demonstrateForkJoinOperator();
        break;
      case 'zip':
        this.rxjsDemo.demonstrateZipOperator();
        break;
      
      // Transformation Operators
      case 'concatMap':
        this.rxjsDemo.demonstrateConcatMapOperator();
        break;
      case 'switchMap':
        this.rxjsDemo.demonstrateSwitchMapOperator();
        break;
      case 'mergeMap':
        this.rxjsDemo.demonstrateMergeMapOperator();
        break;
      
      // Filtering Operators
      case 'filter':
        this.rxjsDemo.demonstrateFilterOperator();
        break;
      case 'skip':
        this.rxjsDemo.demonstrateSkipOperator();
        break;
      case 'takeUntil':
        this.rxjsDemo.demonstrateTakeUntilOperator();
        break;
      
      // Join Operators
      case 'concatAll':
        this.rxjsDemo.demonstrateConcatAllOperator();
        break;
      case 'mergeAll':
        this.rxjsDemo.demonstrateMergeAllOperator();
        break;
      case 'switchAll':
        this.rxjsDemo.demonstrateSwitchAllOperator();
        break;
      case 'startWith':
        this.rxjsDemo.demonstrateStartWithOperator();
        break;
      
      // Utility Operators
      case 'tap':
        this.rxjsDemo.demonstrateTapOperator();
        break;
      
      // Conditional Operators
      case 'every':
        this.rxjsDemo.demonstrateEveryOperator();
        break;
      
      // Subject Demo
      case 'subject':
      case 'behaviorSubject':
        this.rxjsDemo.demonstrateSubjects();
        break;
    }
  }

  back(): void {
    this.showOperators = false;
    this.selectedCategory = '';
  }
}
