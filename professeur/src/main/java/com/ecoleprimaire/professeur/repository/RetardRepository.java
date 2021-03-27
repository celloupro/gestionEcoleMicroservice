package com.ecoleprimaire.professeur.repository;

import com.ecoleprimaire.professeur.domain.Retard;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Retard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RetardRepository extends JpaRepository<Retard, Long> {
}
