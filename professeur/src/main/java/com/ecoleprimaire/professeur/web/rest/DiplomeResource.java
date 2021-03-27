package com.ecoleprimaire.professeur.web.rest;

import com.ecoleprimaire.professeur.domain.Diplome;
import com.ecoleprimaire.professeur.repository.DiplomeRepository;
import com.ecoleprimaire.professeur.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link com.ecoleprimaire.professeur.domain.Diplome}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiplomeResource {

    private final Logger log = LoggerFactory.getLogger(DiplomeResource.class);

    private static final String ENTITY_NAME = "professeurDiplome";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiplomeRepository diplomeRepository;

    public DiplomeResource(DiplomeRepository diplomeRepository) {
        this.diplomeRepository = diplomeRepository;
    }

    /**
     * {@code POST  /diplomes} : Create a new diplome.
     *
     * @param diplome the diplome to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diplome, or with status {@code 400 (Bad Request)} if the diplome has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diplomes")
    public ResponseEntity<Diplome> createDiplome(@Valid @RequestBody Diplome diplome) throws URISyntaxException {
        log.debug("REST request to save Diplome : {}", diplome);
        if (diplome.getId() != null) {
            throw new BadRequestAlertException("A new diplome cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Diplome result = diplomeRepository.save(diplome);
        return ResponseEntity.created(new URI("/api/diplomes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diplomes} : Updates an existing diplome.
     *
     * @param diplome the diplome to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diplome,
     * or with status {@code 400 (Bad Request)} if the diplome is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diplome couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diplomes")
    public ResponseEntity<Diplome> updateDiplome(@Valid @RequestBody Diplome diplome) throws URISyntaxException {
        log.debug("REST request to update Diplome : {}", diplome);
        if (diplome.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Diplome result = diplomeRepository.save(diplome);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, diplome.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diplomes} : get all the diplomes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diplomes in body.
     */
    @GetMapping("/diplomes")
    public List<Diplome> getAllDiplomes() {
        log.debug("REST request to get all Diplomes");
        return diplomeRepository.findAll();
    }

    /**
     * {@code GET  /diplomes/:id} : get the "id" diplome.
     *
     * @param id the id of the diplome to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diplome, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diplomes/{id}")
    public ResponseEntity<Diplome> getDiplome(@PathVariable Long id) {
        log.debug("REST request to get Diplome : {}", id);
        Optional<Diplome> diplome = diplomeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diplome);
    }

    /**
     * {@code DELETE  /diplomes/:id} : delete the "id" diplome.
     *
     * @param id the id of the diplome to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diplomes/{id}")
    public ResponseEntity<Void> deleteDiplome(@PathVariable Long id) {
        log.debug("REST request to delete Diplome : {}", id);
        diplomeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
