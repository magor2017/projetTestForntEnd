import { Component } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { PaiementService } from './services/paiement.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetTestForntEnd';
  //tel=new FormControl("");
  tel:string=undefined;
  forfait:string="";
  numError:boolean=false;
  forfaitError:boolean=false;
  constructor(private paiementService:PaiementService){}
  valider(){
    console.log("valider");
    if(this.verif_tel(this.tel) && this.verif_forfait()){
        this.paiementService.getToken(this.tel,this.forfait).then(rep=>{
          //console.log(rep);
          window.location.href=rep.redirect_url;
      // window.location.href="https://payexpresse.com/payment/checkout/d0bb89d9369f6f7bbbd8";
      }).catch(rep=>{
        alert("Problem au niveau du serveur veuillez reessayer plus tard svp.")
      });
    }
  }
  verif_forfait(){
    if(this.forfait!==undefined && this.forfait!=="" && this.forfait!=="0"){
      return true;
    }else{
      this.forfaitError=true;
      return false;
    }
  }
  verif_tel(num){
    let length=num===undefined?0:num.length;
    if(length===9 && num[0]==="7" && (num[1]==="7" || num[1]==="8")){
      for(let i=0;i<num.length;i++){
        if(!this.isNumber(num[i])){
          this.numError=true;
          return false;
        }
      }
      return true;
    }else{
      this.numError=true;
      return false;
    }
  }
  isNumber(n){
    let num=["0","1","2","3","4","5","6","7","8","9"];
    for(let i=0;i<num.length;i++){
      if(num[i]===n){
        return true;
      }
    }
    return false;
  }
  numBool(){
    this.numError=false;
  }
}
