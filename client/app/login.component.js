System.register(['angular2/core', 'angular2/router', './user', './user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_1, user_service_1, router_2;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_userService, _router) {
                    this._userService = _userService;
                    this._router = _router;
                    this.user = new user_1.User();
                    this.invalidLogin = false;
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this._userService.login(this.user)
                        .subscribe(function (data) {
                        _this.invalidLogin = false;
                        _this._router.navigate(['Home']);
                    }, function (err) {
                        console.log(err);
                        if (err.status == 401) {
                            _this.invalidLogin = true;
                        }
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        styles: ["\n\t\t.col-centered{\n\t\t\tmargin: 0 auto;\n\t\t    float: none;\n\t\t    margin-top: 60px;\n\t\t    padding: 20px;\n\t\t    max-width:450px;\n\t\t}\n\t\t.alert{\n\t\t\tborder-radius: 0px;\n\t\t    margin-top: 5px;\n\t\t    padding: 5px;\n\t\t}\n\t\t.ng-touched.ng-valid[required] {\n\t\t  border-left: 5px solid #42A948; /* green */\n\t\t}\n\t\t.ng-touched.ng-invalid {\n\t\t  border-left: 5px solid #a94442; /* red */\n\t\t}\n\t"],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n\t<div class=\"container login\">\n\t\t<div class=\"row\">\n\n\t\t\t<div class=\"col s12\">\n                <div class=\"card login-content row hoverable\">\n                    <span class=\"card-title grey-text text-darken-2\" style=\"display:block;text-align:center;margin-bottom:15px;\">\n\t\t\t\tLogin</span> \n                    <form (ngSubmit)=\"login()\" #loginForm=\"ngForm\">\n                        <div class=\"input-field\">\n                            <i class=\"mdi-social-person prefix\"></i>\n                             <input type=\"email\" id=\"email\"  ngControl=\"email\" #email=\"ngForm\" [(ngModel)]=\"user.email\" required />\n                            <label for=\"email\">Email</label>\n                        </div>\n                        <div class=\"input-field\">\n                            <i class=\"mdi-action-accessibility prefix\"></i>\n                            <input type=\"password\" id=\"password\" ngControl=\"password\" #password=\"ngForm\" [(ngModel)]=\"user.password\" required />\n                            <label for=\"password\">Password</label>\n                        </div>\n                        <button type=\"submit\" class=\"btn waves-effect red right\">Login</button>\n                    </form>\n                    <div class=\"login-navigation\">\n                        <span>New to Chat. <a [routerLink]=\"['Register']\">Signup</a></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\t"
                    }),
                    router_2.CanActivate(function (next, prev) {
                        if (localStorage.getItem('accessToken')) {
                            return false;
                        }
                        else
                            return true;
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map