package com.ecoleprimaire.ecole.repository;

import com.ecoleprimaire.ecole.domain.AnneeScolaire;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the AnneeScolaire entity.
 */
@Repository
public interface AnneeScolaireRepository extends JpaRepository<AnneeScolaire, Long> {

    @Query(value = "select distinct anneeScolaire from AnneeScolaire anneeScolaire left join fetch anneeScolaire.eleves left join fetch anneeScolaire.classes",
        countQuery = "select count(distinct anneeScolaire) from AnneeScolaire anneeScolaire")
    Page<AnneeScolaire> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct anneeScolaire from AnneeScolaire anneeScolaire left join fetch anneeScolaire.eleves left join fetch anneeScolaire.classes")
    List<AnneeScolaire> findAllWithEagerRelationships();

    @Query("select anneeScolaire from AnneeScolaire anneeScolaire left join fetch anneeScolaire.eleves left join fetch anneeScolaire.classes where anneeScolaire.id =:id")
    Optional<AnneeScolaire> findOneWithEagerRelationships(@Param("id") Long id);
}
