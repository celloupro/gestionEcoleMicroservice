package com.ecoleprimaire.ecole.web.rest;

import com.ecoleprimaire.ecole.domain.AnneeScolaire;
import com.ecoleprimaire.ecole.repository.AnneeScolaireRepository;
import com.ecoleprimaire.ecole.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ecoleprimaire.ecole.domain.AnneeScolaire}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AnneeScolaireResource {

    private final Logger log = LoggerFactory.getLogger(AnneeScolaireResource.class);

    private static final String ENTITY_NAME = "inscriptionAnneeScolaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnneeScolaireRepository anneeScolaireRepository;

    public AnneeScolaireResource(AnneeScolaireRepository anneeScolaireRepository) {
        this.anneeScolaireRepository = anneeScolaireRepository;
    }

    /**
     * {@code POST  /annee-scolaires} : Create a new anneeScolaire.
     *
     * @param anneeScolaire the anneeScolaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new anneeScolaire, or with status {@code 400 (Bad Request)} if the anneeScolaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/annee-scolaires")
    public ResponseEntity<AnneeScolaire> createAnneeScolaire(@Valid @RequestBody AnneeScolaire anneeScolaire) throws URISyntaxException {
        log.debug("REST request to save AnneeScolaire : {}", anneeScolaire);
        if (anneeScolaire.getId() != null) {
            throw new BadRequestAlertException("A new anneeScolaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnneeScolaire result = anneeScolaireRepository.save(anneeScolaire);
        return ResponseEntity.created(new URI("/api/annee-scolaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /annee-scolaires} : Updates an existing anneeScolaire.
     *
     * @param anneeScolaire the anneeScolaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anneeScolaire,
     * or with status {@code 400 (Bad Request)} if the anneeScolaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the anneeScolaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/annee-scolaires")
    public ResponseEntity<AnneeScolaire> updateAnneeScolaire(@Valid @RequestBody AnneeScolaire anneeScolaire) throws URISyntaxException {
        log.debug("REST request to update AnneeScolaire : {}", anneeScolaire);
        if (anneeScolaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AnneeScolaire result = anneeScolaireRepository.save(anneeScolaire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, anneeScolaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /annee-scolaires} : get all the anneeScolaires.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of anneeScolaires in body.
     */
    @GetMapping("/annee-scolaires")
    public List<AnneeScolaire> getAllAnneeScolaires(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all AnneeScolaires");
        return anneeScolaireRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /annee-scolaires/:id} : get the "id" anneeScolaire.
     *
     * @param id the id of the anneeScolaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the anneeScolaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/annee-scolaires/{id}")
    public ResponseEntity<AnneeScolaire> getAnneeScolaire(@PathVariable Long id) {
        log.debug("REST request to get AnneeScolaire : {}", id);
        Optional<AnneeScolaire> anneeScolaire = anneeScolaireRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(anneeScolaire);
    }

    /**
     * {@code DELETE  /annee-scolaires/:id} : delete the "id" anneeScolaire.
     *
     * @param id the id of the anneeScolaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/annee-scolaires/{id}")
    public ResponseEntity<Void> deleteAnneeScolaire(@PathVariable Long id) {
        log.debug("REST request to delete AnneeScolaire : {}", id);
        anneeScolaireRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
