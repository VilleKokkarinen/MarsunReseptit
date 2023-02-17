import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}


  flattenObject = (obj:any, prefix = "") =>
  Object.keys(obj).reduce((acc:any, k) => {
    const pre = prefix.length ? prefix + "." : "";
    if(obj[k] != null){
      if (typeof obj[k] === "object")
      Object.assign(acc, this.flattenObject(obj[k], pre + k));
      else{
        var value:string = obj[k];

        if(value.length > 40){
          value = value.substring(0,40)+"...";
        }

        acc[pre + k] = value;
      }
    }
  
    return acc;
  }, {});

  userToString(){

    //var prettyobject: {[k: string]: any} = {};

    var user = JSON.parse(JSON.stringify(this.authService.userData));
    console.log(user)

    var result = this.flattenObject(user);

    console.log(result)

    var pretty = JSON.stringify(result, null, 2);
    return pretty;
  }
}
