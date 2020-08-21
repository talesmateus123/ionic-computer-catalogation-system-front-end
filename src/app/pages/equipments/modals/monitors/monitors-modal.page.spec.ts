import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorsModalPage } from './monitors-modal.page';

describe('MonitorsModalPage', () => {
  let component: MonitorsModalPage;
  let fixture: ComponentFixture<MonitorsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
