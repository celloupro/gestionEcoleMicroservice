package com.ecoleprimaire.professeur.repository;

import com.ecoleprimaire.professeur.domain.Diplome;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Diplome entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiplomeRepository extends JpaRepository<Diplome, Long> {
}
