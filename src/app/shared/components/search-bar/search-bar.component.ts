import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchValue = '';
  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    if (this.searchValue.trim()) {
      this.search.emit(this.searchValue.trim());
    }
  }
}
