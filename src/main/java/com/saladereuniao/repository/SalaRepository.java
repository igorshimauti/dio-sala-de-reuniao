package com.saladereuniao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saladereuniao.model.Sala;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {

}