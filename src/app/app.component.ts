import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmpresaService } from './servicios/Empresa/empresa.service';
import { RolesService } from './servicios/Roles/roles.service';
import { UsuarioService } from './servicios/Usuario/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  usuarioFrom: FormGroup;
  roles: any;
  empresas: any;
  usuarios: any;

  constructor(
    public fb: FormBuilder,
    public empresaService: EmpresaService,
    public rolesService: RolesService,
    public usuarioService: UsuarioService,

  ) { }

  ngOnInit(): void {
    this.usuarioFrom = this.fb.group({
      Cedula: [''],
      PrimerNombre: ['', Validators.required],
      SegundoNombre: ['', Validators.required],
      PrimerApellido: ['', Validators.required],
      SegundoApellido: ['', Validators.required],
      Clave: ['', Validators.required],
      Email: ['', Validators.email],
      rol: ['', Validators.required],
      Empresa: ['', Validators.required],
      Estado: ['', Validators.required]


    });

    this.rolesService.getAllRoles().subscribe(                     //carga de roles 
      {
        next: resp => {
          this.roles = resp;
          // console.log(resp);
        },
        error: error => console.error(error)
      });

    this.usuarioFrom.get('rol').valueChanges.subscribe(value => {               //carga de empresas
      this.empresaService.getAllEmpresasByRol(value.IdRol).subscribe(

        {
          next: resp => { 
            this.empresas = resp;
          },
          error: error => console.error(error)
        });
    });

    this.usuarioService.getAllUsuarios().subscribe(resp => {
      this.usuarios = resp;
    },
      error => console.error(error)

    );
  }

  guardar(): void { // guardamos a un usuario
    this.usuarioService.saveUsuarios(this.usuarioFrom.value).subscribe(Resp => {
      this.usuarios.reset();
      this.usuarios = this.usuarios.filter(usuario => Resp.Cedula != usuario.Cedula) //editar
      this.usuarios.push(Resp);
    },
      error => console.error(error)
    );
  }

  eliminar(usuario) {
    this.usuarioService.deleteUsuario(usuario.Cedula).subscribe(resp => {
      //console.log(resp)
      if (resp == true) {
        this.usuarios.pop(usuario)
      }
    },
      error => console.error(error)
    );
  }

  editar(usuario) {
    this.usuarioFrom.setValue({

      Cedula: usuario.Cedula,
      PrimerNombre: usuario.PrimerNombre,
      SegundoNombre: usuario.SegundoApellido,
      PrimerApellido: usuario.PrimerApellido,
      SegundoApellido: usuario.SegundoApellido,
      Clave: usuario.Clave,
      Email: usuario.Email,
      Empresa: usuario.Empresa,

    });
  }




}
