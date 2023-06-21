import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reminder',
  templateUrl: './password-reminder.component.html',
  styleUrls: ['./password-reminder.component.css']
})
export class PasswordReminderComponent implements OnInit {

  public reminderForm: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.reminderForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required]))
     });
  }

  public onSubmit() {
    if (this.reminderForm.status === 'INVALID') {
      return;
    } else {
      // send reset EMAIL
    }
  }

  public cancel() {
    this.router.navigate(['/'])
  }
}
