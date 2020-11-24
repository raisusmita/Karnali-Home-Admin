import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { RouterModule } from '@angular/router'

import { HomeModule } from './home/home.module'
import { AuthGuard } from './auth.guard'
import { UserAuthService } from './user-auth.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './shared/token.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HomeModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    UserAuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
