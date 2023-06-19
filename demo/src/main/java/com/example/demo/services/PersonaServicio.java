package com.example.demo.services;

import com.example.demo.entity.Estudiantes;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PersonaServicio {

    private Map<String, List<Estudiantes>> categorias = new HashMap<>();
    private int nextCod = 1;
    //private double notaMinima = 3;

    public PersonaServicio() {

        List<Estudiantes> categoria1 = new ArrayList<>();
        categoria1.add(new Estudiantes(getNextCod(), "Juan", "Lopez", "402A", 4, 5, 3));
        categoria1.add(new Estudiantes(getNextCod(), "Maria", "Torres", "402A", 5, 4, 3));
        List<Estudiantes> categoria2 = new ArrayList<>();
        categoria2.add(new Estudiantes(getNextCod(), "Pedro", "Zapata", "402B", 2, 1, 2));
        categoria2.add(new Estudiantes(getNextCod(), "Luisa", "Villanueva", "402B", 3, 2, 1));
        List<Estudiantes> categoria3 = new ArrayList<>();
        categoria3.add(new Estudiantes(getNextCod(), "Mateo", "Martinez", "402C", 1.4, 2, 3));

        categorias.put("402A", categoria1);
        categorias.put("402B", categoria2);
        categorias.put("402C", categoria3);

        for (List<Estudiantes> categoria : categorias.values()) {
            for (Estudiantes estudiante : categoria) {
                double promedio = (estudiante.getNota1() + estudiante.getNota2() + estudiante.getNota3()) / 3;
                estudiante.setPromedio(promedio);
            }
        }
    }
    public int getNextCod() {
        return nextCod++;
    }

    //1+C
    public List<Estudiantes> listaPersonasPorCategoria(String categoria) {
        return categorias.getOrDefault(categoria, new ArrayList<>());
    }
    //1+C.1
    public List<Estudiantes> listarTodosLosEstudiantes() {
        List<Estudiantes> todosLosEstudiantes = new ArrayList<>();
        for (List<Estudiantes> categoria : categorias.values()) {
            todosLosEstudiantes.addAll(categoria);
        }
        return todosLosEstudiantes;
    }

    //2+c
    public void agregarPersonaPorCategoria(String categoria, Estudiantes nuevaEstudiantes) {
        nuevaEstudiantes.setCod(getNextCod());
        List<Estudiantes> estudiantesCategoria = categorias.get(categoria);
        if (estudiantesCategoria == null) {
            estudiantesCategoria = new ArrayList<>();
            categorias.put(categoria, estudiantesCategoria);
        }
        estudiantesCategoria.add(nuevaEstudiantes);
    }

    //3+C
    public List<Estudiantes> listarEstudiantesAprobados() {
        List<Estudiantes> estudiantesAprobados = new ArrayList<>();
        for (List<Estudiantes> categoria : categorias.values()) {
            for (Estudiantes estudiante : categoria) {
                if (estudiante.isAprobado()) {
                    estudiantesAprobados.add(estudiante);
                }
            }
        }
        return estudiantesAprobados;
    }

}
