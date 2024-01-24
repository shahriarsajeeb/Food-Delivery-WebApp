import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
  subject: string;
  email: string;
  name: string;
  activation_token: string;
  template: string;
};

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendMail({
    subject,
    email,
    name,
    activation_token,
    template,
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activation_token,
      },
    });
  }
}