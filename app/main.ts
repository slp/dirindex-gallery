/// <reference path="../typings/index.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { appRouterProviders } from './app.routes';
import { AppComponent } from './app.component';
bootstrap(AppComponent, [ HTTP_PROVIDERS, appRouterProviders ]);
