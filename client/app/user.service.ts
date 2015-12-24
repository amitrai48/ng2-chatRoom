import { Injectable } from 'angular2/core'
import { Http, Headers } from 'angular2/http';


@Injectable()
export class UserService{
	http: Http;
	user: Object;
	constructor(http:Http){
		this.http = http;
	}
	signUp(user){
		console.log("Called");
		return this.http.post('./api/ChatUsers', JSON.stringify(user), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.map((res)=>{
			return res.json();
		});
	}

	login(user){
		return this.http.post('./api/ChatUsers/login', JSON.stringify(user), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.map((res) => {
				return res.json();
			})
			.map((res)=>{
				this.user = res;
				localStorage.setItem('accessToken', res.id);
				return res;
			});
	}

	logout(){
		return this.http.post('./api/ChatUsers/logout?access_token=' +localStorage.getItem('accessToken'), "", {
			headers : new Headers({
				'Content-Type': 'application/json'
			})
		}).map((res)=>{
			console.log(res);
			return res;
		})
		.map((res)=>{
			this.user = null;
			localStorage.removeItem('accessToken');
			return res;
		});
	}

	getRooms(){
		return this.http.get('./api/Rooms?access_token=' + localStorage.getItem('accessToken'), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).map((res) => {
			return res.json();
		})
	}

	createRoom(room){
		return this.http.post('./api/Rooms?access_token=' + localStorage.getItem('accessToken'), JSON.stringify(room), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).map((res) => {
			return res.json();
		});
	}
	sendMessage(message){
		console.log(message);
		return this.http.post('./api/Messages/sendmessage?access_token=' + localStorage.getItem('accessToken'), JSON.stringify(message), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).map((res) => {
			return res.json();
		});
	}

	
}