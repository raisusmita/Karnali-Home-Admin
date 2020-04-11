import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";

// This commented modules has to be added here since it can be used through out the project
// import { HttpClientModule } from "@angular/common/http";

// import { MatIconModule } from "@angular/material/icon";
// import { MatSidenavModule } from "@angular/material/sidenav";
// import { MatButtonModule } from "@angular/material/button";
// import { MatListModule } from "@angular/material/list";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatDialogModule } from "@angular/material/dialog";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatInputModule } from "@angular/material/input";
// import { MatTableModule } from "@angular/material/table";
// import { MatSelectModule } from "@angular/material/select";

import { HomeModule } from "./home/home.module";
import { UserService } from "./user.service";
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, HomeModule],
  providers: [UserService, AuthGuard],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
