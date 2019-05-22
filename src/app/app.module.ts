import { PrinterService } from './services/printer.service';
import { BrowserModule } from '@angular/platform-browser';
import {  LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import {
  AuthModule,
  AUTH_SERVICE,
  PUBLIC_FALLBACK_PAGE_URI,
  PROTECTED_FALLBACK_PAGE_URI,
} from 'ngx-auth';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FormComponent } from './leads/form/form.component';
import { InputComponent } from './forms/input/input.component';
import { BusinessComponent } from './leads/form/business/business.component';
import { LabelComponent } from './forms/label/label.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthenticateService } from './services/authenticate.service';
import { LeadComponent } from './leads/lead/lead.component';
import { ProductsearchService } from './services/productsearch.service';
import { CardComponent } from './leads/card/card.component';
import { NotifyService} from './services/notify.service';
import { NotifyComponent } from './common/notify/notify.component';
import { AutofocusDirective } from './forms/autofocus/autofocus.directive';
import { LoaderComponent } from './common/loader/loader.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TooltipComponent } from './common/tooltip/tooltip.component';
import { FlatComponent } from './elements/buttons/flat/flat.component';
import { HelperComponent } from './elements/helper/helper.component';
import { DigitsDirective } from './directives/digits/digits.directive';
import { TileComponent } from './elements/tile/tile.component';
import { PreviewComponent } from './elements/preview/preview.component';
import { InfoComponent } from './elements/info/info.component';
import { NameinitialsPipe } from './pipes/nameinitials.pipe';
import { QuotesPipe } from './pipes/quotes.pipe';
import { TextareaComponent } from './forms/textarea/textarea.component';
import { SubmitComponent } from './elements/buttons/submit/submit.component';
import { LabelHelperComponent } from './common/label-helper/label-helper.component';
import { TabComponent } from './elements/tab/tab.component';
import { CheckboxComponent } from './elements/checkbox/checkbox.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './common/modal/modal.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PushService } from '@app/services/push.service';
import { SuggestComponent } from './forms/suggest/suggest.component';
import { StatusPipe } from './pipes/status.pipe';
import { ManagerfilterPipe } from '@app/pipes/managerfilter.pipe';
import { HelperService } from '@app/services/helper.service';
import { SwitchComponent } from './common/switch/switch.component';
registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    InputComponent,
    BusinessComponent,
    LabelComponent,
    LeadComponent,
    CardComponent,
    NotifyComponent,
    AutofocusDirective,
    LoaderComponent,
    TooltipDirective,
    TooltipComponent,
    FlatComponent,
    HelperComponent,
    DigitsDirective,
    TileComponent,
    PreviewComponent,
    InfoComponent,
    NameinitialsPipe,
    QuotesPipe,
    TextareaComponent,
    SubmitComponent,
    LabelHelperComponent,
    TabComponent,
    CheckboxComponent,
    ModalComponent,
    OrderByPipe,
    SuggestComponent,
    StatusPipe,
    ManagerfilterPipe,
    SwitchComponent
],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
    RouterModule.forRoot([]),
    ScrollToModule.forRoot(),
  ],
  providers: [
    AuthenticateService,
    ProductsearchService,
    NotifyService,
    PrinterService,
    PushService,
    HelperService,
    {
      provide: 'API_URL',
      useValue: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
    },
    {
      provide: 'API_KEY',
      useValue: '5c0fa69268870b7061361c5bdfc30bc1b1e95846'
    },
   // { provide: AUTH_SERVICE, useClass: AuthenticateService },
    { provide: LOCALE_ID, useValue: 'ru' }
   /* {
      provide: APP_INITIALIZER,
      useFactory: (loadService: AuthenticateService) => function() { return loadService.loadToken(); },
      multi: true,
      deps: [AuthenticateService]
    }
    */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
