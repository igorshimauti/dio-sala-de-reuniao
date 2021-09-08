package com.saladereuniao.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.saladereuniao.exception.ResourceNotFoundException;
import com.saladereuniao.model.Sala;
import com.saladereuniao.repository.SalaRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class SalaController {

	@Autowired
	private SalaRepository salaRepository;
	
	@GetMapping(value = "/salas", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Sala> listar() {
		return salaRepository.findAll();
	}
	
	@GetMapping(value = "/salas/{salaId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sala> buscar(@PathVariable Long salaId) throws ResourceNotFoundException {
		Sala sala = salaRepository.findById(salaId).orElseThrow(() -> new ResourceNotFoundException("Sala não encontrada:: " + salaId));
		return ResponseEntity.ok(sala);
	}
	
	@PostMapping(value = "/salas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Sala> incluir(@Valid @RequestBody Sala sala) {
		return ResponseEntity.ok(salaRepository.save(sala));
	}

	@PutMapping(value = "/salas/{salaId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sala> atualizar(@PathVariable Long salaId, @Valid @RequestBody Sala sala) throws ResourceNotFoundException {
		if (!salaRepository.existsById(salaId)) {
			throw new ResourceNotFoundException("Sala não encontrada:: " + salaId);
		}
		
		sala.setId(salaId);
		return ResponseEntity.ok(salaRepository.save(sala));
	}
	
	@DeleteMapping(value = "/salas/{salaId}")
	public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long salaId) throws ResourceNotFoundException {
		Map<String, Boolean> response = new HashMap<>();
		
		if (!salaRepository.existsById(salaId)) {
			throw new ResourceNotFoundException("Sala não encontrada:: " + salaId);
		}
		
		salaRepository.deleteById(salaId);
		response.put("Deleted", true);
		return ResponseEntity.ok(response);
	}
}