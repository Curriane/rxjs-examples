import { Injectable } from '@angular/core';
import {
  Observable, Subject, BehaviorSubject, empty, of, combineLatest,
  forkJoin, zip, interval, timer, from,
  fromEvent
} from 'rxjs';
import {
  take, map, tap, filter, skip, takeUntil, concatMap,
  switchMap, mergeMap, concatAll, mergeAll, startWith,
  delay, every,
  switchAll
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RxjsDemoService {

  constructor() { }

  // Creation Operators
  demonstrateEmptyOperator(): void {
    console.log(`       
      // Empty Operator 示範
      empty().subscribe({
        next: value => console.log(\`下一個值: \${value}\`),
        error: err => console.error(\`錯誤: \${err}\`),
        complete: () => console.log('完成！Empty 不發射任何值，只會完成。')
      });
        `);
    console.log('--- Empty Operator 示範 ---');

    empty().subscribe({
      next: value => console.log(`下一個值: ${value}`),
      error: err => console.error(`錯誤: ${err}`),
      complete: () => console.log('完成！Empty 不發射任何值，只會完成。')
    });
  }

  demonstrateOfOperator(): void {
    console.log(`
      // Of Operator 示範
      of(1, 2, 3).subscribe({
        next: value => console.log(\`下一個值: \${value}\`),
        error: err => console.error(\`錯誤: \${err}\`),
        complete: () => console.log('完成！')
      });
        `);
    console.log('--- Of Operator 示範 ---');

    of(1, 2, 3).subscribe({
      next: value => console.log(`下一個值: ${value}`),
      error: err => console.error(`錯誤: ${err}`),
      complete: () => console.log('完成！')
    });
  }

  // Join Creation Operators
  demonstrateCombineLatestOperator(): void {
    console.log('--- CombineLatest Operator 示範 ---');
    const firstTimer = timer(0, 1000).pipe(
      take(3),
      map(x => `A${x + 1}`)
    );
    const secondTimer = timer(500, 1000).pipe(
      take(3),
      map(x => `B${x + 1}`)
    );

    console.log('當任一 Observable 發射新值時，combineLatest 會發射所有來源的最新值:');
    const combinedObservable = combineLatest([
      firstTimer, secondTimer]);
    combinedObservable.subscribe({
      next: value => console.log(`組合值: [${value}]`),
      complete: () => console.log('完成！')
    });
  }

  demonstrateForkJoinOperator(): void {
    console.log('--- ForkJoin Operator 示範 ---');
    const observable1 = of('hello').pipe(delay(1000));
    const observable2 = of('world').pipe(delay(2000));
    const observable3 = timer(3000).pipe(take(1));


    console.log('forkJoin 等待所有 Observables 完成，然後發射它們的最終值:');
    console.log('等待所有請求完成...');
    const forkedObservable =
      forkJoin([observable1, observable2, observable3]);
    forkedObservable.subscribe({
      next: value => console.log(`結果: ${value}`),
      complete: () => console.log('完成！')
    });
  }

  demonstrateZipOperator(): void {
    console.log('--- Zip Operator 示範 ---');
    const age$ = of(27, 25, 29);
    const name$ = of('張三', '李四', '王五');
    const isActive$ = of(true, false, true);
    const zippedObservable = zip(name$, age$, isActive$).pipe(
      map(([name, age, isActive]) => ({ name, age, isActive }))
    );
    zippedObservable.subscribe(x => console.log(x));
  }

  // Transformation Operators
  demonstrateConcatMapOperator(): void {
    console.log('--- ConcatMap Operator 示範 ---');
    const source$ = of('A', 'B', 'C');
    const result$ = source$.pipe(
      concatMap(val => interval(1000).pipe(
        take(3),
        map(i => `${val}${i + 1}`)
      ))
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateSwitchMapOperator(): void {
    console.log('--- SwitchMap Operator 示範 ---');
    // 按鈕再次被點擊，switchMap 會立即取消訂閱前一個內部 Observable，然後訂閱新的
    // 前一次的搜尋會被中斷，只保留最新的搜尋結果。
    const button = document.createElement('button');
    button.textContent = '開始搜尋';
    document.body.appendChild(button);
    const click$ = fromEvent(button, 'click');
    const result$ = click$.pipe(
      switchMap(() => {
        console.log('開始新的搜尋...');
        return interval(1000).pipe(
          take(3),
          map(i => `搜尋結果 ${i + 1}`)
        );
      })
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateMergeMapOperator(): void {
    console.log('--- MergeMap Operator 示範 ---');
    const source$ = of('A', 'B', 'C');
    const result$ = source$.pipe(
      mergeMap(val => interval(1000).pipe(
        take(3),
        map(i => `${val}${i + 1}`)
      ))
    );
    result$.subscribe(x => console.log(x));
  }

  // Filtering Operators
  demonstrateFilterOperator(): void {
    console.log('--- Filter Operator 示範 ---');
    const source$ = from([0, 1, 2, 3, 4]);
    const result$ = source$.pipe(
      filter(x => x % 2 === 1)
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateSkipOperator(): void {
    console.log('--- Skip Operator 示範 ---');
    const source$ = from(['a', 'b', 'c', 'd', 'e']);
    const result$ = source$.pipe(
      skip(3)
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateTakeUntilOperator(): void {
    console.log('--- TakeUntil Operator 示範 ---');
    const source$ = interval(1000);
    const notifier$ = timer(5500);
    console.log('開始倒數計時...');
    const result$ = source$.pipe(
      takeUntil(notifier$)
    );
    result$.subscribe(x => console.log(x));
  }

  // Join Operators
  demonstrateConcatAllOperator(): void {
    console.log('--- ConcatAll Operator 示範 ---');
    const source$ = of(1, 2, 3);
    const result$ = source$.pipe(
      map(val => interval(500).pipe(take(3), map(i => `${val}-${i}`))),
      concatAll()
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateMergeAllOperator(): void {
    console.log('--- MergeAll Operator 示範 ---');
    const source$ = of(1, 2, 3);
    const result$ = source$.pipe(
      map(val => interval(500).pipe(take(3), map(i => `${val}-${i}`))),
      mergeAll()
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateSwitchAllOperator(): void {
    console.log('--- SwitchAll Operator 示範 ---');
    const source$ = of(1, 2, 3);
    const result$ = source$.pipe(
      map(val => interval(500).pipe(take(3), map(i => `${val}-${i}`))),
      switchAll()
    );
    result$.subscribe(x => console.log(x));
  }

  demonstrateStartWithOperator(): void {
    console.log('--- StartWith Operator 示範 ---');
    const source$ = of('apple', 'banana', 'cherry');

    const result$ = source$.pipe(
      startWith('start!')
    );

    result$.subscribe(x => console.log(x));
  }

  // Utility Operators
  demonstrateTapOperator(): void {
    console.log('--- Tap Operator 示範 ---');
    const source$ = of(1, 2, 3);
    const result$ = source$.pipe(
      tap(val => console.log(`原始值: ${val}`)),
      map(val => val * 10),
      tap(val => console.log(`變換值: ${val}`))
    );
    result$.subscribe(x => console.log(x));
  }

  // Conditional Operators
  demonstrateEveryOperator(): void {
    console.log('--- Every Operator 示範 ---');
    const source$ = from([5, 10, 15, 18, 20]);
    const result$ = source$.pipe(
      every(x => x % 5 === 0)
    );
    result$.subscribe(x => console.log(x));
  }

  // Subject Demo
  demonstrateSubjects(): void {
    console.log('--- Subject 與 BehaviorSubject 比較 ---');

    // Subject 示範
    console.log('1. 標準 Subject 示範:');
    const subject = new Subject<string>();

    // 先訂閱，後發送值
    subject.subscribe({
      next: value => console.log(`第一個訂閱者: ${value}`),
      complete: () => console.log('第一個訂閱者完成！')
    });

    subject.next('A');
    subject.next('B');

    // 後訂閱的無法獲取之前的值
    console.log('新增第二個訂閱者 (錯過了 A 和 B):');
    subject.subscribe({
      next: value => console.log(`第二個訂閱者: ${value}`),
      complete: () => console.log('第二個訂閱者完成！')
    });

    subject.next('C');
    subject.complete();

    // BehaviorSubject 示範
    console.log('\n2. BehaviorSubject 示範 (帶有初始值):');
    const behaviorSubject = new BehaviorSubject<string>('初始值');

    // 先訂閱，能獲取當前值
    behaviorSubject.subscribe({
      next: value => console.log(`第一個訂閱者: ${value}`),
      complete: () => console.log('第一個訂閱者完成！')
    });

    behaviorSubject.next('X');
    behaviorSubject.next('Y');

    // 後訂閱的也能獲取最新值
    console.log('新增第二個訂閱者 (可以獲取最後一個值 Y):');
    behaviorSubject.subscribe({
      next: value => console.log(`第二個訂閱者: ${value}`),
      complete: () => console.log('第二個訂閱者完成！')
    });

    behaviorSubject.next('Z');
    behaviorSubject.complete();
  }
}