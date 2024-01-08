import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Altruist from 'altruist-sdk-web';

window.Altruist = Altruist;

Altruist.init({
  app_key: "YOUR_APP_KEY",
  url: "https://your.domain.firebird",
  debug: true
});
Altruist.track_sessions();

if (environment.production) {
  enableProdMode();

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
