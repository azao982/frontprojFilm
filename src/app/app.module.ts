import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AjoutComponent } from './ajout/ajout.component';
import { SuppComponent } from './supp/supp.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AproposComponent } from './apropos/apropos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { listesdesfilmsComponent } from './listesdesfilms/listesdesfilms.component';
import { DetailsfilmsComponent } from './detailsfilms/detailsfilms.component';
import { modifierfilmsComponent } from './modifierfilms/modifierfilms.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    listesdesfilmsComponent,
    NavbarComponent,
    ConnexionComponent,
    AjoutComponent,
    SuppComponent,
    InscriptionComponent,
    AproposComponent,
    DetailsfilmsComponent,
    modifierfilmsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
