import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  name: string = 'Appareil';
  status: string = 'Status';

  constructor(private appareilService: AppareilService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(this.appareilService.getAppareilById(+id)?.name)
    if(this.appareilService.getAppareilById(+id)?.name){
      this.name = this.appareilService.getAppareilById(+id)?.name as string;
      this.status = this.appareilService.getAppareilById(+id)?.status as string;
    } else {
      this.router.navigate(['not-found']);
    }
  }

}
