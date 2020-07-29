import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoElectronicComponentModalPage } from './info-electronic-component-modal.page';

describe('InfoElectronicComponentModalPage', () => {
  let component: InfoElectronicComponentModalPage;
  let fixture: ComponentFixture<InfoElectronicComponentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoElectronicComponentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoElectronicComponentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
