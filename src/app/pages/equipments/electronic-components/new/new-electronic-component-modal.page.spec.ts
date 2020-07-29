import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewElectronicComponentModalPage } from './new-electronic-component-modal.page';

describe('NewElectronicComponentPage', () => {
  let component: NewElectronicComponentModalPage;
  let fixture: ComponentFixture<NewElectronicComponentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewElectronicComponentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewElectronicComponentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
