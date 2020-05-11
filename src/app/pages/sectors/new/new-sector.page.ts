import { Component, OnInit } from '@angular/core';
import { SectorNewDTO } from 'src/app/models/sector_new.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorService } from '../shared';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.page.html',
  styleUrls: ['./new-sector.page.scss'],
})
export class NewSectorPage implements OnInit {
  object: SectorNewDTO = {
    name: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SectorService) { }

  ngOnInit() {
  }

  create(){
    this.service.create(this.object).subscribe(
      res => {
        alert('Criado com sucesso!')
        this.router.navigate(['/sectors']);
      }
    )
  }

}
