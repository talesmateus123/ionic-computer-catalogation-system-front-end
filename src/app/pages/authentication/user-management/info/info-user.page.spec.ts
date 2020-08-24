import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoUserPage } from './info-user.page';

describe('InfoUserPage', () => {
  let component: InfoUserPage;
  let fixture: ComponentFixture<InfoUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
