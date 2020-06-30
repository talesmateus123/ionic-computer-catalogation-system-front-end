import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewElectronicComponentPage } from './new-electronic-component.page';

describe('NewElectronicComponentPage', () => {
  let component: NewElectronicComponentPage;
  let fixture: ComponentFixture<NewElectronicComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewElectronicComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewElectronicComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
