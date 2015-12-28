import { Component } from 'angular2/core'
import { ROUTER_DIRECTIVES,Router } from 'angular2/router'
import { NgForm } from 'angular2/common'
import { User } from './user'
import { UserService } from './user.service'
import { ComponentInstruction,CanActivate } from 'angular2/router'


@Component({
	selector:'login',
	styles:[`
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
	directives: [ROUTER_DIRECTIVES],
	template:`
	<div class="container login">
		<div class="row">

			<div class="col s12">
                <div class="card login-content row hoverable">
                    <span class="card-title grey-text text-darken-2" style="display:block;text-align:center;margin-bottom:15px;">
				Login</span> 
                    <form (ngSubmit)="login()" #loginForm="ngForm">
                        <div class="input-field">
                            <i class="mdi-social-person prefix"></i>
                             <input type="email" id="email"  ngControl="email" #email="ngForm" [(ngModel)]="user.email" required />
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="mdi-action-accessibility prefix"></i>
                            <input type="password" id="password" ngControl="password" #password="ngForm" [(ngModel)]="user.password" required />
                            <label for="password">Password</label>
                        </div>
                        <button type="submit" class="btn waves-effect red right">Login</button>
                    </form>
                    <div class="login-navigation">
                        <span>New to Chat. <a [routerLink]="['Register']">Signup</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
	`
})
@CanActivate((next,prev)=>{
		if (localStorage.getItem('accessToken')){
			return false;
		}
		else
			return true;
})
export class LoginComponent {
	public user: User;
	invalidLogin: boolean;
	constructor(private _userService: UserService, private _router: Router) {
		this.user = new User();
		this.invalidLogin = false;
	}

	login(){
		this._userService.login(this.user)
			.subscribe(
			(data) => {
				this.invalidLogin = false;
				this._router.navigate(['Home']);
			},
			(err) => { 
				console.log(err);
				if(err.status==401){
					this.invalidLogin = true;
				}
			});
	}
}