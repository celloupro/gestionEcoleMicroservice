package com.ecoleprimaire.ecole.repository;

import com.ecoleprimaire.ecole.domain.Eleve;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Eleve entity.
 */
@Repository
public interface EleveRepository extends JpaRepository<Eleve, Long> {

    @Query(value = "select distinct eleve from Eleve eleve left join fetch eleve.parents left join fetch eleve.classes",
        countQuery = "select count(distinct eleve) from Eleve eleve")
    Page<Eleve> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct eleve from Eleve eleve left join fetch eleve.parents left join fetch eleve.classes")
    List<Eleve> findAllWithEagerRelationships();

    @Query("select eleve from Eleve eleve left join fetch eleve.parents left join fetch eleve.classes where eleve.id =:id")
    Optional<Eleve> findOneWithEagerRelationships(@Param("id") Long id);
}
