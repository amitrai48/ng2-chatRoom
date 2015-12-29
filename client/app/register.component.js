System.register(['angular2/core', 'angular2/router', './user', './user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_1, user_service_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_userService, _router) {
                    this._userService = _userService;
                    this._router = _router;
                    this.user = new user_1.User();
                }
                RegisterComponent.prototype.register = function () {
                    var _this = this;
                    this._userService.signUp(this.user)
                        .subscribe(function (data) { console.log(data); _this._router.navigate(['Login']); }, function (err) { return console.log(err); });
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register',
                        styles: ["\n\t\t.col-centered{\n\t\t\tmargin: 0 auto;\n\t\t    float: none;\n\t\t    margin-top: 60px;\n\t\t    padding: 20px;\n\t\t    max-width:450px;\n\t\t}\n\n\t\t.alert{\n\t\t\tborder-radius: 0px;\n\t\t    margin-top: 5px;\n\t\t    padding: 5px;\n\t\t}\n\t\t.ng-touched.ng-valid[required] {\n\t\t  border-left: 5px solid #42A948; /* green */\n\t\t}\n\t\t.ng-touched.ng-invalid {\n\t\t  border-left: 5px solid #a94442; /* red */\n\t\t}\n\t"],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n\t<div class=\"container register\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col s12\">\n                <div class=\"card register-content row hoverable\">\n                    <span class=\"card-title grey-text text-darken-2\" style=\"display:block;text-align:center;margin-bottom:15px;\">\n\t\t\t\tRegister</span> \n                    <form (ngSubmit)=\"register()\" #registerForm=\"ngForm\">\n                        <div class=\"input-field\">\n                            <i class=\"mdi-social-person prefix\"></i>\n                             <input type=\"email\" id=\"email\" [(ngModel)]=\"user.email\" ngControl=\"email\" #email=\"ngForm\" required />\n                            <label for=\"email\">Email</label>\n                        </div>\n                        <div class=\"input-field\">\n                            <i class=\"mdi-action-accessibility prefix\"></i>\n                            <input type=\"password\" id=\"password\"  [(ngModel)]=\"user.password\" ngControl=\"password\" #password=\"ngForm\" required />\n                            <label for=\"password\">Password</label>\n                        </div>\n                        <button type=\"submit\" class=\"btn waves-effect red right\">Register</button>\n                    </form>\n                    <div class=\"login-navigation\">\n                        <span>Already registered! <a [routerLink]=\"['Login']\">Login</a></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\t"
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
            })();
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map