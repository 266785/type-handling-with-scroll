import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PageComponent,
    AgePipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
