System.register(['angular2/core', './user.service', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1, router_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_userService, _router) {
                    var _this = this;
                    this._userService = _userService;
                    this._router = _router;
                    this.rooms = [];
                    this.addRoomBool = false;
                    this.newRoom = {};
                    this.message = {};
                    this.messages = [];
                    this._userService.getCurrentUser()
                        .subscribe(function (data) {
                        console.log(data);
                        _this.userId = _this._userService.user.id;
                        _this.user = _this._userService.user;
                    }, function (err) { console.log(err); });
                    this.onlineUsers = 0;
                    this.roomCounts = {};
                    this.socket = io.connect({ 'forceNew': true });
                }
                HomeComponent.prototype.ngOnInit = function () {
                    console.log("Called");
                    $(".button-collapse").sideNav();
                    this.getRooms();
                    var _this = this;
                    this.socket.on('message', function (msg) {
                        console.log(msg);
                        _this.messages.push(msg);
                        console.log($(".messages")[0].scrollHeight);
                        setTimeout(function () {
                            $(".messages").scrollTop($(".messages")[0].scrollHeight);
                        }, 10);
                    });
                    this.socket.on('room info', function (info) {
                        console.log(info);
                        Materialize.toast(info, 4000);
                    });
                    this.socket.on('count', function (count) {
                        console.log(count);
                        _this.onlineUsers = count.allCount;
                        _this.roomCounts = count.roomCounts;
                    });
                };
                HomeComponent.prototype.logout = function () {
                    var _this = this;
                    this._userService.logout()
                        .subscribe(function (data) {
                        _this.socket.disconnect();
                        _this._router.navigate(['Login']);
                    }, function (err) { return console.log(err); });
                };
                HomeComponent.prototype.getRooms = function () {
                    var _this = this;
                    this._userService.getRooms()
                        .subscribe(function (data) {
                        console.log(data);
                        _this.rooms = data;
                    });
                };
                HomeComponent.prototype.addRoom = function () {
                    this.addRoomBool = true;
                };
                HomeComponent.prototype.createRoom = function () {
                    var _this = this;
                    this._userService.createRoom(this.newRoom)
                        .subscribe(function (data) {
                        console.log(data);
                        _this.addRoomBool = false;
                        _this.getRooms();
                    }, function (err) {
                        console.log(err);
                    });
                };
                HomeComponent.prototype.joinRoom = function (room) {
                    var oldRoom = this.selectedRoom;
                    console.log(this.user);
                    if (oldRoom !== room) {
                        this.socket.emit('subscribe', { oldRoom: oldRoom, newRoom: room, user: this.user });
                        this.selectedRoom = room;
                        this.messages = [];
                    }
                };
                HomeComponent.prototype.sendMessage = function () {
                    this.message.userId = this._userService.user.id;
                    this.message.roomId = this.selectedRoom.id;
                    this._userService.sendMessage(this.message)
                        .subscribe(function (data) {
                        console.log(data);
                    }, function (err) { return console.log(err); });
                    this.message = {};
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home-component',
                        styles: ["\n\t\t.badge{\n\t\t\tfont-size:1.5rem;\n\t\t}\n\n\t\t.collection .collection-item a{\n\t\t\theight:40px;\n\t\t\tline-height:40px;\n\t\t}\n\n\t\t.input-msg{\n\t\t    bottom: 0;\n\t\t    position: fixed;\n\t\t    width: 60%;\n\t\t}\n\n\t\t.messages .collection{\n\t\t\tborder:none;\n\t\t}\n\t\t.messages .collection .collection-item{\n\t\t\tborder: 1px solid #e0e0e0;\n\t\t    width: 48%;\n\t\t    clear:both;\n\t\t    float:left;\n\t\t    background-color: #D6E0DF;\n\t\t    margin-top:10px;\n\t\t    position:relative;\n\t\t}\n\n\t\t.messages .collection .collection-item.myMsg{\n\t\t\tfloat:right;\n\t\t\tbackground-color: #A0F3EB;\n\t\t}\n\n\t\t.messages .content{\n\t\t\tmargin-bottom: 5px;\n\t\t    display: inline-block;\n\t\t    font-size: 12px;\n\t\t    line-height: 1.2rem;\n\t\t    font-family: cursive;\n\t\t}\n\n\t\t.messages .sent{\n\t\t\tfont-size: 0.6rem;\n\t\t    position: absolute;\n\t\t    right: 5px;\n\t\t    bottom: -2px;\n\t\t    font-family: cursive;\n\t\t}\n\t"],
                        template: "\n\t<header>\n\t\t<nav>\n\t        <div class=\"nav-wrapper teal lighten-2\">\n\t            <a class=\"brand-logo\">@mbush</a>\n\t            <a data-activates=\"mobile-demo\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n\t            <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n\t            \t<li>Online Users : {{onlineUsers}} </li>\n\t                <li><a class=\"waves-effect waves-light\" (click)=\"logout()\">Logout</a></li>\n\t                \n\t            </ul>\n\t            <ul id=\"mobile-demo\" class=\"side-nav\">\n\t            \t<li>Online Users : {{onlineUsers}} </li>\n\t                <li><a class=\"waves-effect waves-light\" (click)=\"logout()\">Logout</a></li>     \n\t            </ul>\n\t        </div>\n\t    </nav>\n\n\t    <ul id=\"slide-out\" class=\"side-nav fixed collection\">\n\t    \t<li class=\"logo\"><a id=\"logo-container\" ></a></li>\n\t\t    <li><a class=\"waves-effect waves-light\">Rooms <span class=\"teal-text text-lighten-2 badge mdi-action-supervisor-account\"></span></a></li>\n\t\t    <li *ngIf=\"addRoomBool\">\n\n\t\t    \t<form (ngSubmit)=\"createRoom()\" #roomForm=\"ngForm\">\n                        <div class=\"input-field\">\n                             <input placeholder=\"Room Name\" type=\"text\" id=\"room\" ngControl=\"room\" #room=\"ngForm\" [(ngModel)]=\"newRoom.name\" required />\n                            \n                        </div>\n                        \n                </form>\n\n\t\t    </li>\n\t\t    <li class=\"collection-item room\" *ngFor=\"#room of rooms \" (click)=\"joinRoom(room)\" [class.selected]=\"selectedRoom===room\">\n\t\t    \t<a class=\"waves-effect waves-light\"><span>{{room.name}}</span><span class=\"badge\">{{roomCounts[room.id]}}</span></a>\n\t\t    </li>\n\t\t    \n\t\t    \n\t    </ul>\n      \n\t</header>\n\t<main>\n\t<div class=\"container no-room\" *ngIf=\"!selectedRoom\">\n\t\t<div class=\"row\">\n\n\t\t\t<div class=\"col s12\">\n                <div class=\"card room-card row hoverable\">\n\t                <span class=\"card-title grey-text text-darken-2\" style=\"display:block;text-align:center;margin-bottom:15px;\">\n\t\t\t\t\t\tPlease Select a room to start chatting!\n\t\t\t\t\t</span> \n            \n                </div>\n            </div>\n        </div>\n\t</div>\n\t<div class=\"container\" *ngIf=\"selectedRoom\">\n\t\t<div class=\"row messages\">\n\t\t\t<div class=\"col s12\">\n\t\t\t\t<ul class=\"collection\">\n\t\t\t\t\t<li class=\"collection-item\" *ngFor=\"#message of messages\" [class.myMsg]=\"userId===message.userId\">\n\t\t\t\t\t\t<span class=\"content\">{{message.content}}</span>\n\t\t\t\t\t\t<span class=\"sent\">~{{message.user.email}}</span>\n\t\t\t\t\t</li>\t\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"row input-msg\">\n\t\t\t<div class=\"col s12\">\n\t\t\t\t<form>\n\t\t\t\t\t<form (ngSubmit)=\"sendMessage()\" #roomForm=\"ngForm\">\n                        <div class=\"input-field\">\n                        <button type=\"submit\" class=\"mdi-content-send prefix send\"></button>\n                             <input type=\"text\" id=\"msg\" ngControl=\"msg\" #msg=\"ngForm\" [(ngModel)]=\"message.content\" required />\n                            \t<label for=\"msg\">Type your Message </label>\n\n                        </div>\n                        \n                </form>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t</main>\n\t"
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map