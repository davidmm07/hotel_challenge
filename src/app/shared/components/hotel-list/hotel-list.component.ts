import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../models/hotel';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime, finalize, catchError } from 'rxjs/operators';
import { Query } from '../../models/query';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit, OnChanges {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  @Input() qs: Query;
  public batchSize = 10;
  public isLoading: boolean;
  public alertMessage: any;
  public hotels: Hotel;
  public hotel: any;
  public endBatch = false;
  public params = '';
  public addParams = '';
  public ch: SimpleChanges;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  constructor(private hotelService: HotelService, private snackBar: MatSnackBar, public cd: ChangeDetectorRef) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );
    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }

  ngOnInit() {
    this.isLoading = true;
    //this.getBatch('0');
  }
  refresh() {
    this.ngOnChanges(this.ch);
  }
  //valida cambios del query de filtros
  ngOnChanges(changes: SimpleChanges) {
    // code...
    if (typeof changes['qs'] !== 'undefined') {
      // retrieve the quiz variable change info
      var change = changes['qs'];

      // only perform the task if the value has been changed
      if (!change.isFirstChange()) {
        // execute the Http request and retrieve the result
        console.log(this.qs);
        this.addParams = '&name=' + this.qs.name + this.qs.filter;
        this.hotels = null;
        //this.isLoading = true;
        console.log(changes);
        console.log('cambio');

        this.offset = new BehaviorSubject(null);
        const batchMap = this.offset.pipe(
          throttleTime(500),
          mergeMap(n => this.getBatch(n)),
          scan((acc, batch) => {
            return { ...acc, ...batch };
          }, {})
        );
        this.infinite = batchMap.pipe(map(v => Object.values(v)));
        this.ch = changes;
      }
    }

    console.log(changes);
  }

  //Ejecuta el evento al hacer el scroll
  /*
parametros: e:Evento scroll
offset: primer o siguiente lote de datos
*/
  nextBatch(e: Event, offset: any) {
    console.log('nextBatch', offset);
    if (this.endBatch) {
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i: any) {
    return i;
  }
  //Obtiene listado de hoteles por lotes de datos (de 10 en 10)
  getBatch(offset: string) {
    console.log(offset);
    this.params = '?limit=' + this.batchSize + '&skip=' + offset + this.addParams;
    return this.hotelService.get('hotel/' + this.params).pipe(
      tap(arr => (arr.hotels.length ? null : (this.endBatch = true))),
      map(arr => {
        return arr.hotels.reduce((acc: any, cur: any) => {
          const id = cur._id;
          const data = cur;
          return { ...acc, [id]: data };
        }, {});
      }),
      catchError(err => {
        this.alertMessage = err.message;
        this.openAlert(this.alertMessage, 'Aceptar');
        return throwError(err);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  openAlert(message: string, action: string) {
    let config = new MatSnackBarConfig();
    this.snackBar.open(message, action, { duration: 2000, panelClass: ['open-alert'] });
  }
}
