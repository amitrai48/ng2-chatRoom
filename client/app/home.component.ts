import { Component,OnInit } from 'angular2/core'
import { UserService } from './user.service'
import { Router } from 'angular2/router'
@Component({
	selector:'home-component',
	styles:[`
		.badge{
			font-size:1.5rem;
		}

		.collection .collection-item a{
			height:40px;
			line-height:40px;
		}

		.input-msg{
		    bottom: 0;
		    position: fixed;
		    width: 60%;
		}

		.messages .collection{
			border:none;
		}
		.messages .collection .collection-item{
			border: 1px solid #e0e0e0;
		    width: 48%;
		    clear:both;
		    float:left;
		    background-color: #D6E0DF;
		    margin-top:10px;
		    position:relative;
		}

		.messages .collection .collection-item.myMsg{
			float:right;
			background-color: #A0F3EB;
		}

		.messages .content{
			margin-bottom: 5px;
		    display: inline-block;
		    font-size: 12px;
		    line-height: 1.2rem;
		    font-family: cursive;
		}

		.messages .sent{
			font-size: 0.6rem;
		    position: absolute;
		    right: 5px;
		    bottom: -2px;
		    font-family: cursive;
		}
	`],
	template:`
	<header>
		<nav>
	        <div class="nav-wrapper teal lighten-2">
	            <a class="brand-logo">@mbush</a>
	            <a data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
	            <ul id="nav-mobile" class="right hide-on-med-and-down">
	            	<li>Online Users : {{onlineUsers}} </li>
	                <li><a class="waves-effect waves-light" (click)="logout()">Logout</a></li>
	                
	            </ul>
	            <ul id="mobile-demo" class="side-nav">
	            	<li>Online Users : {{onlineUsers}} </li>
	                <li><a class="waves-effect waves-light" (click)="logout()">Logout</a></li>     
	            </ul>
	        </div>
	    </nav>

	    <ul id="slide-out" class="side-nav fixed collection">
	    	<li class="logo"><a id="logo-container" ></a></li>
		    <li><a class="waves-effect waves-light">Rooms <span class="teal-text text-lighten-2 badge mdi-action-supervisor-account"></span></a></li>
		    <li *ngIf="addRoomBool">

		    	<form (ngSubmit)="createRoom()" #roomForm="ngForm">
                        <div class="input-field">
                             <input placeholder="Room Name" type="text" id="room" ngControl="room" #room="ngForm" [(ngModel)]="newRoom.name" required />
                            
                        </div>
                        
                </form>

		    </li>
		    <li class="collection-item room" *ngFor="#room of rooms " (click)="joinRoom(room)" [class.selected]="selectedRoom===room">
		    	<a class="waves-effect waves-light">{{room.name}}</a>
		    </li>
		    
		    
	    </ul>
      
	</header>
	<main>
	<div class="container no-room" *ngIf="!selectedRoom">
		<div class="row">

			<div class="col s12">
                <div class="card room-card row hoverable">
	                <span class="card-title grey-text text-darken-2" style="display:block;text-align:center;margin-bottom:15px;">
						Please Select a room to start chatting!
					</span> 
            
                </div>
            </div>
        </div>
	</div>
	<div class="container" *ngIf="selectedRoom">
		<div class="row messages">
			<div class="col s12">
				<ul class="collection">
					<li class="collection-item" *ngFor="#message of messages" [class.myMsg]="userId===message.userId">
						<span class="content">{{message.content}}</span>
						<span class="sent">~{{message.user.email}}</span>
					</li>	
				</ul>
			</div>
		</div>

		<div class="row input-msg">
			<div class="col s12">
				<form>
					<form (ngSubmit)="sendMessage()" #roomForm="ngForm">
                        <div class="input-field">
                        <button type="submit" class="mdi-content-send prefix send"></button>
                             <input type="text" id="msg" ngControl="msg" #msg="ngForm" [(ngModel)]="message.content" required />
                            	<label for="msg">Type your Message </label>

                        </div>
                        
                </form>
				</form>
			</div>
		</div>
	</div>
	</main>
	`
})
export class HomeComponent implements OnInit{
	rooms;
	newRoom: Object;
	addRoomBool: boolean;
	socket;
	message: Object;
	selectedRoom;
	messages;
	userId;
	onlineUsers: number;
	constructor(private _userService : UserService,private _router:Router){
		this.rooms = [];
		this.addRoomBool = false;
		this.newRoom = {};
		this.message = {};
		this.messages = [];
		if (this._userService.user)
			this.userId = this._userService.user.userId;
		this.onlineUsers = 0;
	}

	ngOnInit(){
		$(".button-collapse").sideNav();
		this.getRooms();
		this.socket = io();
		
		var _this = this;
		this.socket.on('message', function(msg) {
			_this.messages.push(msg);
			console.log($(".messages")[0].scrollHeight);
			setTimeout(function() {
				$(".messages").scrollTop($(".messages")[0].scrollHeight);
			}, 10);
			
		});

		this.socket.on('count',function(count){
			console.log(count);
			_this.onlineUsers = count.allCount;
		});
	}
	logout(){
		this._userService.logout()
			.subscribe(
			(data) => {
				this.socket.disconnect();
				this._router.navigate(['Login']);
			},
			err=> console.log(err));

	}
	getRooms(){
		this._userService.getRooms()
		.subscribe(
			(data)=>{
				console.log(data);
				this.rooms = data;
			})
	}

	addRoom() {
		this.addRoomBool = true;
	}

	createRoom(){
		this._userService.createRoom(this.newRoom)
			.subscribe(
			(data) => {
				console.log(data);
				this.addRoomBool = false;
				this.getRooms();
			},
			(err) => {
				console.log(err);
			});
	}

	joinRoom(room){
		this.socket.emit('subscribe',room);
		this.selectedRoom = room;
	}

	sendMessage(){
		this.message.userId = this._userService.user.userId;
		this.message.roomId = this.selectedRoom.id;
		this._userService.sendMessage(this.message)
			.subscribe((data) => {
				console.log(data);
			}, err=> console.log(err));
		this.message = {};
	}
	
}