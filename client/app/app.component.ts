import { Component } from 'angular2/core'
import { RouteConfig,ROUTER_DIRECTIVES } from 'angular2/router'
import { LoginComponent } from './login.component'
import { RegisterComponent } from './register.component'
import { UserService } from './user.service'
import { HomeComponent } from './home.component'
@Component({
	selector:'my-app',
	providers:[UserService],
	template:`
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path:'/login',name:'Login',component:LoginComponent, useAsDefault:true},
	{path:'/register',name:'Register',component:RegisterComponent},
	{path:'/home', name:'Home', component:HomeComponent }
])
export class AppComponent{
	constructor(_userService:UserService){
		
	}
}