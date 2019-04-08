import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Query } from '../shared/models/query';
import { QuoteService } from './quote.service';
import { HotelListComponent } from '../shared/components/hotel-list/hotel-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(HotelListComponent) hotelListComponent: HotelListComponent;
  @Input() query: Query;
  public queryaux: Query;
  public arraystars: any;
  quote: string;
  isLoading: boolean;

  constructor(private quoteService: QuoteService, public cd: ChangeDetectorRef) {
    this.query = new Query('', '');
    this.queryaux = new Query('', '');
    this.arraystars = Array(5)
      .fill(0)
      .map((x, i) => i + 1)
      .reverse();
  }
  public step = -1;

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;

    this.query = this.queryaux;
    this.hotelListComponent.refresh();
    console.log(this.query);
  }

  prevStep() {
    this.step--;
  }
  onFilter() {
    this.step = -1;
    if (this.queryaux.filter !== '') {
      this.query.filter = '&stars=' + this.queryaux.filter;
    }
    this.hotelListComponent.refresh();
    console.log(this.query);
  }
  arrayOne(n: number): any[] {
    return this.arraystars;
  }
  arrayRow(n: number): any[] {
    return Array(n);
  }
}
