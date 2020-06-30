import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoElectronicComponentPage } from './info-electronic-component.page';

describe('InfoElectronicComponentPage', () => {
  let component: InfoElectronicComponentPage;
  let fixture: ComponentFixture<InfoElectronicComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoElectronicComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoElectronicComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
