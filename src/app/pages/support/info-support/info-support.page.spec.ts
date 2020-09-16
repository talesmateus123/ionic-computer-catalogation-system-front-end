import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoSupportPage } from './info-support.page';

describe('InfoSupportPage', () => {
  let component: InfoSupportPage;
  let fixture: ComponentFixture<InfoSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSupportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
