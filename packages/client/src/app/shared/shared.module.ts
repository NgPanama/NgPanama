import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [],
  imports: [
    // vendor
    CommonModule,
    RouterModule,
    HttpClientModule,

  ],
  exports: [
    // vendor
    CommonModule, // NgIf, NgFor
    RouterModule, // router-link, <router-outlet>

  ],
})
export class SharedModule {}
