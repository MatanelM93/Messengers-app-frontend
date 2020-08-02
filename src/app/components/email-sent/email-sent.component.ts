import { Component } from '@angular/core';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent {

  email_sent_message: string;
  email_sub_text: string;
  email_confirmation_text: string;
  constructor() { 
    let email = localStorage.getItem('email');
    let confirmation = localStorage.getItem('confirmationLink') || null;
    if (email){
      this.email_sent_message = `Email sent to address ${email}, Confirm account by clicking the link`;
      this.email_sub_text = `sometimes it gets to your spam box, check out there if it is not in your mailbox`;
      this.email_confirmation_text = !!confirmation
          ? `support for foreign emails - use this link to confirm: <a href="${this.email_confirmation_text}"></a>`
          : ``
    }else{
      this.email_sent_message = `You have not sign in or you're account has already been confirmed.`;
      this.email_sub_text = "";
      this.email_confirmation_text = ""
    }
  }

}
