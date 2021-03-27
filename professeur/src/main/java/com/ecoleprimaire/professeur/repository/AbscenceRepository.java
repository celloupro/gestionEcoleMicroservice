package com.ecoleprimaire.professeur.repository;

import com.ecoleprimaire.professeur.domain.Abscence;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Abscence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbscenceRepository extends JpaRepository<Abscence, Long> {
}
