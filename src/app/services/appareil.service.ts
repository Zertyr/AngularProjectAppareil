import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import  { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  
  appareilSubject = new Subject<any[]>();

  appareils: any[];

  constructor(private httpClient: HttpClient) { }

  emitAppareilSubject(){
    // on extrait tout les appareils pour les passer dans le tableau subject
    this.appareilSubject.next(this.appareils.slice());
  }
  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll(){
    for(let appareil of this.appareils){
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll(){
    for(let appareil of this.appareils){
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
    
  }

  switchOnOne(i: number){
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();

  }
  switchOnOff(i: number){
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();

  }

  addAppareil(name:string, status:string){
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();

  }

  saveAppareilsToServer() {
    this.httpClient.put('https://http-client-demo-69eea-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
    .subscribe(
      () => {
        console.log('Terminé !');
        
      },
      (error) => {
        console.log('erreur :' + error);
        
      }
    )
  }

  getAppareilsFromServer(){
    this.httpClient
      .get<any>('https://http-client-demo-69eea-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response ;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur de chargement ! ' + error);
          
        }
      );
  }
}
