import { AppComponent } from './app.component'
import { bootstrap } from 'angular2/platform/browser'
import { ROUTER_PROVIDERS,LocationStrategy,HashLocationStrategy } from 'angular2/router'
import { provide } from 'angular2/core'
import {HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';

bootstrap(AppComponent,[
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy })
	]);