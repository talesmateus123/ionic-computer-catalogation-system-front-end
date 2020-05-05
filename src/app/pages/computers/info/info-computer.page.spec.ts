import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoComputerPage } from './info-computer.page';

describe('InfoComputerPage', () => {
  let component: InfoComputerPage;
  let fixture: ComponentFixture<InfoComputerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoComputerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComputerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
