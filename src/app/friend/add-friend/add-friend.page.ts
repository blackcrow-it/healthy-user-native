import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, AlertController, LoadingController } from '@ionic/angular';
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
  spinner = false;

  //Add Loading
  loading = this.loadingController.create({
    message: 'Đang xử lý dữ liệu',
  });
  presentLoading(){
    this.loading.then(ob =>{
      ob.present();
    })
  }
  dismissLoading(){
    this.loading.then(ob =>{
      ob.dismiss();
    })
  }

  constructor(
    private alertController: AlertController,
    private friendAPI: FriendshipService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.friendAPI.getListRequestsFriend().then(ob => {
      ob.subscribe(res => {
        this.dataRequests = res.data
        console.log(this.dataRequests)
        this.dismissLoading();
      }, () =>{
        this.dismissLoading();
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

  async actionFriend(item) {
    var loading = await this.loadingController.create({
      message: 'Đang xử lý dữ liệu',
    });
    loading.present()
    if(item.status == 'Not friend') {
      this.friendAPI.sendAddFriend(item.email).then(ob => {
        ob.subscribe(async () => {
          this.successSend(item.full_name)
          item.status = 'Wait accept'
          await loading.dismiss()
        })
      })
    } else if (item.status == 'Wait accept') {
      this.friendAPI.decline(item.email).then(ob => {
        ob.subscribe(async () => {
          item.status = 'Not friend'
          await loading.dismiss()
        })
      })
    } else if (item.status == 'Accept available') {
      this.confirmInvite('Phê duyệt', `Đồng ý lời mời kết bạn của ${item.full_name}`, item)
      await loading.dismiss()
    } else if (item.status == 'Friend') {
      this.confirmUnfriend('Phê duyệt', `Bạn chắc chắn muốn hủy kết bạn với ${item.full_name} chứ?`, item)
      await loading.dismiss()
    }
  }

  searchPeople(event: any) {
    this.spinner = true;
    if(event.target.value.replace(/\s+/g, '') != "") {
      this.friendAPI.getPeople(event.target.value).then(ob => {
        ob.subscribe(res => {
          this.data = res.data
          console.log(res);
          this.spinner = false;
        })
      })
    } else{
      this.data = []
      this.spinner = false;
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
