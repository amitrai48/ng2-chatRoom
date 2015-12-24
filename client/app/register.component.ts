import { Component } from 'angular2/core'
import { ROUTER_DIRECTIVES, Router } from 'angular2/router'
import { User } from './user'
import {NgForm} from 'angular2/common'
import {UserService} from './user.service'
@Component({
	selector:'register',
	styles: [`
		.col-centered{
			margin: 0 auto;
		    float: none;
		    margin-top: 60px;
		    padding: 20px;
		    max-width:450px;
		}

		.alert{
			border-radius: 0px;
		    margin-top: 5px;
		    padding: 5px;
		}
		.ng-touched.ng-valid[required] {
		  border-left: 5px solid #42A948; /* green */
		}
		.ng-touched.ng-invalid {
		  border-left: 5px solid #a94442; /* red */
		}
	`],
	directives:[ROUTER_DIRECTIVES],
	template:`
	<div class="container register">
		<div class="row">
			<div class="col s12">
                <div class="card register-content row hoverable">
                    <span class="card-title grey-text text-darken-2" style="display:block;text-align:center;margin-bottom:15px;">
				Register</span> 
                    <form (ngSubmit)="register()" #registerForm="ngForm">
                        <div class="input-field">
                            <i class="mdi-social-person prefix"></i>
                             <input type="email" id="email" [(ngModel)]="user.email" ngControl="email" #email="ngForm" required />
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="mdi-action-accessibility prefix"></i>
                            <input type="password" id="password"  [(ngModel)]="user.password" ngControl="password" #password="ngForm" required />
                            <label for="password">Password</label>
                        </div>
                        <button type="submit" class="btn waves-effect red right">Register</button>
                    </form>
                    <div class="login-navigation">
                        <span>Already registered! <a [routerLink]="['Login']">Login</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

	`
})
export class RegisterComponent{
	public user : User;
	constructor(private _userService : UserService,private _router : Router ){
		this.user = new User();
	}

	register(){
		this._userService.signUp(this.user)
			.subscribe(
			(data) => { console.log(data); this._router.navigate(['Login']); },
			err => console.log(err));
	}
}