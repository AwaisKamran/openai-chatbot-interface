import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../utility/constants';

@Component({
  selector: 'app-message-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-panel.component.html',
  styleUrl: './message-panel.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MessagePanelComponent{
  @ViewChild('scrollframe', { static: true })
  scrollFrame!: ElementRef;

  @ViewChild('audio', { static: true })
  audio!: ElementRef;

  @ViewChild('audioToggle', { static: true })
  audioToggle!: ElementRef;

  private scrollContainer: any;

  private _messages: Message[] = [];

  userPath = "../../assets/user-path.png"
  avatarPath = "../../assets/bot-path.png"

  @Input()
  loading!: boolean;

  toggle = false

  @Input() set messages(data: Message[]) {
    this.updateData(data).then(() => {
      if(data.length){
        this.scrollToBottom();

        if(this.toggle){
          this.audio.nativeElement.play();
        }
        else{
          this.audioToggle.nativeElement.play();
        }
        this.toggle = !this.toggle;
      }
    })
  }

  get messages(): Message[] {
    return this._messages;
  }

  updateData(data: Message[]){
    return new Promise((resolve)=> {
      this._messages = [...data];
      resolve(true);
    })
  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
  } 

  public scrollToBottom(): void {
    if(this.scrollContainer){
      this.scrollContainer.scroll({
        top: this.scrollContainer.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
