import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { ClientCrudComponent } from './client/crud/client-crud.component';
import { MainComponent } from './main/main.component';
import { UsuariosListaComponent } from './usuarios/lista/usuarios-lista.component';
import { ClientListaComponent } from './client/lista/client-lista.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientCrudComponent,
    MainComponent,
    UsuariosListaComponent,
    ClientListaComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
