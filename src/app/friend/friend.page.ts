import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FriendshipService } from '../services/api/friendship.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {

  data: any;
  countFriend: number;

  constructor(
    private navServie: DataService,
    private friendAPI: FriendshipService
  ) { }

  ngOnInit() {
    var date = new Date();
    date.setHours(0, 0, 0, 0)
    this.friendAPI.getFriend(date.getTime(), "").then(ob => {
      ob.subscribe(res => {
        this.countFriend = res.data.length
      })
    })
  }

  addFriend() {
    this.navServie.push('add-friend');
  }

  searchFriend(event){
    if(event.target.value.replace(/\s+/g, '') != "") {
      var date = new Date();
      date.setHours(0, 0, 0, 0)
      this.friendAPI.getFriend(date.getTime(), event.target.value).then(ob => {
        ob.subscribe(res => {
          this.data = res.data
        })
      })
    } else {
      this.data = []
    }
  }

  getFriend() {
    var date = new Date();
    date.setHours(0, 0, 0, 0)
    this.friendAPI.getFriend(date.getTime(), "").then(ob => {
      ob.subscribe(res => {
        this.data = res.data
      })
    })
  }

  getFriendByStatus(status: number) {
    var date = new Date();
    date.setHours(0, 0, 0, 0)
    this.friendAPI.getFriend(date.getTime(), "", status).then(ob => {
      ob.subscribe(res => {
        this.data = res.data
      })
    })
  }

  pushMessage(weight_current: number, weight_start: number, weight_finish: number){
    var msg: string;
    //Giảm cân
    if(weight_start > weight_finish){
      //Bị tăng cân
      if(weight_current > weight_start){
        msg = `Bị tăng thêm ${weight_current - weight_start} kg.`
      } 
      //Đang giảm cân
      else if (weight_current < weight_start) {
        //Giảm cân quá mong muốn
        if(weight_current < weight_finish) {
          msg = `Giảm quá mong muốn ${weight_finish - weight_current} kg.`
        } else {
          msg = `Đã giảm được ${weight_start - weight_current} kg.`
        }
      } else {
        msg = `Chưa có thay đổi gì về cân nặng.`
      }
    } 
    //Tăng cân
    else if (weight_start < weight_finish) {
      //Bị giảm cân
      if(weight_current < weight_start){
        msg = `Bị sút mất ${weight_start - weight_current} kg.`
      }
      //Đang giảm cân
      else if (weight_current > weight_start) {
        //Giảm cân quá mong muốn
        if(weight_current > weight_finish) {
          msg = `Tăng vượt mong muốn ${weight_current - weight_finish} kg.`
        } else {
          msg = `Đã tăng thêm ${weight_current - weight_start} kg.`
        }
      } else {
        msg = `Chưa có thay đổi gì về cân nặng.`
      }
    }
    else {
      if(weight_current < weight_start){
        msg = `Bị sút mất ${weight_start - weight_current} kg.`
      } else if(weight_current > weight_start){
        msg = `Bị tăng thêm ${weight_current - weight_start} kg.`
      } else {
        msg = `Mục tiêu giữ cân nặng.`
      }
    }
    return msg
  }
}
