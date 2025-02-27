import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name:string = '';
  surname:string = '';
  email:string = '';
  password:string = '';
  phone:string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ){

  }

  register(){
    if(!this.name ||
      !this.surname ||
      !this.email ||
      !this.password ||
      !this.phone){
        this.toastr.error('Validacion', 'Todos los campos son obligatorios' );
      return;
    }
    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      phone: this.phone,
    }
    this.authService.register(data).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.error && resp.error.error == 'Unauthorized'){
        this.toastr.error('Validacion', 'Credenciales son incorrectas' );
        return;
      }
      if(resp == true){
        this.toastr.success('Exito', 'Bienvenido a la tienda' );
        setTimeout(() => {
          this.router.navigateByUrl('/'); 
        }, 50);      
      }  
    })
  }

}
