import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { UserInputComponent } from './user-input/user-input.component';
import { Message, MESSAGE_TYPE, OpenAIResponse } from './utility/constants';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './openai.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    MessagePanelComponent, 
    UserInputComponent, 
    HttpClientModule,
    HeaderComponent,
    UserInputComponent,
    MessagePanelComponent
  ],
  providers: [OpenAIService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent  {
  title = 'exploring-angular';
  data: Message[] = [];
  loading: boolean = false

  constructor(private openaiService: OpenAIService) {}

  getMessage($event: string){
    if(!this.loading){
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
      this.loading = true;

      this.openaiService.QueryPrompt($event).subscribe(
        (response: OpenAIResponse): void => {
          messageObject = this.createMessage(response.content.replace(/【[0-9]*†source】/g, ''), MESSAGE_TYPE.ASSISTANT)
          this.data = [...this.data].concat(messageObject)
          this.loading = false;
        })
    }
    else{
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
    }
  }

  createMessage(content: string, type: MESSAGE_TYPE): Message{
    return {
      id: uuidv4(),
      sender: type,
      content: content,
      dateTime: new Date(),
    }
  }

  public debounce(func: Function, timeout = 400){
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}
