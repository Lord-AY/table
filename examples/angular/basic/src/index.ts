import '@angular/compiler'
import 'zone.js'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { bootstrapApplication } from '@angular/platform-browser'
import { BasicExampleComponent } from './basic-example.component'

bootstrapApplication(BasicExampleComponent, {
  providers: [provideHttpClient(withFetch())],
})
