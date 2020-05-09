import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoSectorPage } from './info-sector.page';

describe('InfoSectorPage', () => {
  let component: InfoSectorPage;
  let fixture: ComponentFixture<InfoSectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoSectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
