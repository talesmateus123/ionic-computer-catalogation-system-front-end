import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMonitorModalPage } from './new-monitor-modal.page';

describe('NewMonitorModalPage', () => {
  let component: NewMonitorModalPage;
  let fixture: ComponentFixture<NewMonitorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMonitorModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMonitorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
