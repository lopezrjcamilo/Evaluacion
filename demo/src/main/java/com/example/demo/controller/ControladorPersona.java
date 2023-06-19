package com.example.demo.controller;

import com.example.demo.entity.Estudiantes;
import com.example.demo.services.PersonaServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ControladorPersona {

    private final PersonaServicio servicio;

    public ControladorPersona(PersonaServicio servicio) {
        this.servicio = servicio;
    }

    //1+C
    @GetMapping("/listarPersonasPorCategoria/{categoria}")
    public List<Estudiantes> listaPersonaPorCategoria(@PathVariable String categoria) {
        return servicio.listaPersonasPorCategoria(categoria);
    }
    //1+C.1
    @GetMapping("/listarTodosLosEstudiantes")
    public List<Estudiantes> listarTodosLosEstudiantes() {
        return servicio.listarTodosLosEstudiantes();
    }

    //2+C
    @PostMapping("/insertarPersonaPorCategoria/{categoria}")
    public void insertarPersonaPorCategoria(@PathVariable String categoria, @RequestBody Estudiantes estudiantes) {
        servicio.agregarPersonaPorCategoria(categoria, estudiantes);
    }

    //3+C
    @GetMapping("/listarEstudiantesAprobados")
    public List<Estudiantes> listarEstudiantesAprobados() {
        return servicio.listarEstudiantesAprobados();
    }

}
