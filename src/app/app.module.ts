import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { UserInputComponent } from './user-input/user-input.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OpenAIService } from './openai.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterOutlet,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    MessagePanelComponent,
    UserInputComponent,
  ],
  providers: [OpenAIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
