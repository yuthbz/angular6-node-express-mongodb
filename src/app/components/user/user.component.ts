import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private myForm: FormGroup;
  private submitted = false;
  private users: User[];

  countries = ['USA', 'Germany', 'Italy', 'France'];

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: this.formBuilder.group({
        street: '',
        city: '',
        province: '',
        postcode: '',
        country: '',
      }),
    });

    this.onLoad();

  }

  get f() { return this.myForm.controls; }

  get addg() { return this.myForm.controls.address['controls']; }


  onLoad() {

    return this.userService.getUserLists().subscribe((response) => {

      this.users = response;

    });

  }

  onEdit(id: string) {

    this.userService.editUsers(id).subscribe((users) => {

      this.myForm.patchValue(users);

    });


  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }

    const formValue = this.myForm.value;

    this.userService.addUsers(formValue).subscribe((response) => {

      this.onLoad();

    });

  }

  onDelete(id: string) {

    this.userService.deleteUsers(id).subscribe((response) => {

      this.onLoad();

    });

  }

  onReset() {

    this.myForm.reset();

  }



}

interface User {
  _id: string;
  firstName: string;
  lastName: number;
  email: string;
  password: string;
  __v: number;
}
