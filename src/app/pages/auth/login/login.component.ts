import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string = '';
  password:string = '';
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    public router: Router,

  ){

  }
  ngOnInit(): void {
    //this.showSuccess();
    if(this.authService.token && this.authService.user){
      setTimeout(() => {
        this.router.navigateByUrl('/'); 
      }, 50);
      return;      
  }
  }

  login(){
    if(!this.email || !this.password ){
      this.toastr.error('Validacion', 'Todos los campos son obligatorios' );
      return;
    }
    this.authService.login(this.email, this.password).subscribe((resp:any)=>{
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
    },(error)=>{
      console.log(error);
  })
}
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
