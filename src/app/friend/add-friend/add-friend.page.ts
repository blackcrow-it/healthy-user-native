import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, AlertController } from '@ionic/angular';
import { FriendshipService } from '../../services/api/friendship.service'

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {
  @ViewChild('selectAccept', { static: false }) selectRef: IonSelect;

  data = [];
  dataRequests = [];

  textSearch: string;

  constructor(
    private alertController: AlertController,
    private friendAPI: FriendshipService
  ) { }

  ngOnInit() {
    this.friendAPI.getListRequestsFriend().then(ob => {
      ob.subscribe(res => {
        this.dataRequests = res.data
        console.log(this.dataRequests)
      })
    })
  }

  async confirmInvite(title, msg, item) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Xóa',
          cssClass: 'secondary',
          handler: (blah) => {
            this.friendAPI.decline(item.email).then(ob => {
              ob.subscribe(() => {
                item.status = 'Not friend'
              })
            })
          }
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.friendAPI.accept(item.email).then(ob => {
              ob.subscribe(() => {
                item.status = 'Friend'
              })
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmUnfriend(title, msg, item) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Hủy',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Đồng ý',
          handler: () => {
            this.friendAPI.decline(item.email).then(ob => {
              ob.subscribe(() => {
                item.status = 'Not friend'
              })
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async successSend(fullname) {
    const alert = await this.alertController.create({
      header: 'Đã gửi!',
      message: `Vui lòng chờ chấp nhận kết bạn của ${fullname}.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  actionFriend(item) {
    if(item.status == 'Not friend') {
      this.friendAPI.sendAddFriend(item.email).then(ob => {
        ob.subscribe(() => {
          this.successSend(item.full_name)
          item.status = 'Wait accept'
        })
      })
    } else if (item.status == 'Wait accept') {
      this.friendAPI.decline(item.email).then(ob => {
        ob.subscribe(() => {
          item.status = 'Not friend'
        })
      })
    } else if (item.status == 'Accept available') {
      this.confirmInvite('Phê duyệt', `Đồng ý lời mời kết bạn của ${item.full_name}`, item)
    } else if (item.status == 'Friend') {
      this.confirmUnfriend('Phê duyệt', `Bạn chắc chắn muốn hủy kết bạn với ${item.full_name} chứ?`, item)
    }
  }

  searchPeople(event: any) {
    if(event.target.value.replace(/\s+/g, '') != "") {
      this.friendAPI.getPeople(event.target.value).then(ob => {
        ob.subscribe(res => {
          this.data = res.data
          console.log(res);
        })
      })
    } else{
      this.data = []
    }
  }

  confirmRequest(itemClick: any) {
    this.friendAPI.accept(itemClick.email).then(ob => {
      ob.subscribe(() => {
        this.dataRequests.forEach(item => {
          if (item.email == itemClick.email) {
            var index = this.dataRequests.indexOf(item)
            if (index > -1) {
              this.dataRequests.splice(index, 1);
            }
          }
        });
      })
    })
  }

  deleteRequest(itemClick: any) {
    this.friendAPI.decline(itemClick.email).then(ob => {
      ob.subscribe(() => {
        this.dataRequests.forEach(item => {
          if (item.email == itemClick.email) {
            var index = this.dataRequests.indexOf(item)
            if (index > -1) {
              this.dataRequests.splice(index, 1);
            }
          }
        });
      })
    })
  }

  customAlertOptions: any = {
    header: '',
    subHeader: '',
    message: '',
    translucent: true
  };
}
