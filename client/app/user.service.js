System.register(['angular2/core', 'angular2/http'], function(exports_1) {
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
    var core_1, http_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                }
                UserService.prototype.signUp = function (user) {
                    console.log("Called");
                    return this.http.post('./api/ChatUsers', JSON.stringify(user), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .map(function (res) {
                        return res.json();
                    });
                };
                UserService.prototype.login = function (user) {
                    var _this = this;
                    return this.http.post('./api/ChatUsers/login', JSON.stringify(user), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (res) {
                        _this.user = res;
                        localStorage.setItem('accessToken', res.id);
                        return res;
                    });
                };
                UserService.prototype.logout = function () {
                    var _this = this;
                    return this.http.post('./api/ChatUsers/logout?access_token=' + localStorage.getItem('accessToken'), "", {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        console.log(res);
                        return res;
                    })
                        .map(function (res) {
                        _this.user = null;
                        localStorage.removeItem('accessToken');
                        return res;
                    });
                };
                UserService.prototype.getRooms = function () {
                    return this.http.get('./api/Rooms?access_token=' + localStorage.getItem('accessToken'), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        return res.json();
                    });
                };
                UserService.prototype.createRoom = function (room) {
                    return this.http.post('./api/Rooms?access_token=' + localStorage.getItem('accessToken'), JSON.stringify(room), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        return res.json();
                    });
                };
                UserService.prototype.sendMessage = function (message) {
                    console.log(message);
                    return this.http.post('./api/Messages/sendmessage?access_token=' + localStorage.getItem('accessToken'), JSON.stringify(message), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        return res.json();
                    });
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            })();
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map