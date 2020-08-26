import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoConnectionPage } from './no-connection.page';

describe('NoConnectionPage', () => {
  let component: NoConnectionPage;
  let fixture: ComponentFixture<NoConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConnectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
