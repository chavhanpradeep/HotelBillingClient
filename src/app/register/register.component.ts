import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { ToastService } from '@app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  roles:any = ["user"];
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.userForm = this.formBuilder.group({
      id: [],
      fullName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      vendorId: new FormControl('0', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ])
    });
  }

  addUser() {
    const newUser = Object.assign({}, this.user, this.userForm.value);
    newUser[`currentPassword`] = 'tempP@ss123';
    newUser[`newPassword`] = 'tempP@ss123';
    newUser.roles = this.roles;
    this.registerService.addUser(newUser).subscribe(
      res => {
        console.log(`res = ${res}`);
        this.toastService.showSuccessMessage('User registered successfully, login to continue');
        this.router.navigate(['/login']);
      },
      err => {
        this.toastService.showDangerMessage("Failed to register. Try again later");
      }
    );
  }
}
