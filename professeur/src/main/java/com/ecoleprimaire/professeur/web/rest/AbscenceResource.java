package com.ecoleprimaire.professeur.web.rest;

import com.ecoleprimaire.professeur.domain.Abscence;
import com.ecoleprimaire.professeur.repository.AbscenceRepository;
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
 * REST controller for managing {@link com.ecoleprimaire.professeur.domain.Abscence}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AbscenceResource {

    private final Logger log = LoggerFactory.getLogger(AbscenceResource.class);

    private static final String ENTITY_NAME = "professeurAbscence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AbscenceRepository abscenceRepository;

    public AbscenceResource(AbscenceRepository abscenceRepository) {
        this.abscenceRepository = abscenceRepository;
    }

    /**
     * {@code POST  /abscences} : Create a new abscence.
     *
     * @param abscence the abscence to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new abscence, or with status {@code 400 (Bad Request)} if the abscence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/abscences")
    public ResponseEntity<Abscence> createAbscence(@Valid @RequestBody Abscence abscence) throws URISyntaxException {
        log.debug("REST request to save Abscence : {}", abscence);
        if (abscence.getId() != null) {
            throw new BadRequestAlertException("A new abscence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Abscence result = abscenceRepository.save(abscence);
        return ResponseEntity.created(new URI("/api/abscences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /abscences} : Updates an existing abscence.
     *
     * @param abscence the abscence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated abscence,
     * or with status {@code 400 (Bad Request)} if the abscence is not valid,
     * or with status {@code 500 (Internal Server Error)} if the abscence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/abscences")
    public ResponseEntity<Abscence> updateAbscence(@Valid @RequestBody Abscence abscence) throws URISyntaxException {
        log.debug("REST request to update Abscence : {}", abscence);
        if (abscence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Abscence result = abscenceRepository.save(abscence);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, abscence.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /abscences} : get all the abscences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of abscences in body.
     */
    @GetMapping("/abscences")
    public List<Abscence> getAllAbscences() {
        log.debug("REST request to get all Abscences");
        return abscenceRepository.findAll();
    }

    /**
     * {@code GET  /abscences/:id} : get the "id" abscence.
     *
     * @param id the id of the abscence to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the abscence, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/abscences/{id}")
    public ResponseEntity<Abscence> getAbscence(@PathVariable Long id) {
        log.debug("REST request to get Abscence : {}", id);
        Optional<Abscence> abscence = abscenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(abscence);
    }

    /**
     * {@code DELETE  /abscences/:id} : delete the "id" abscence.
     *
     * @param id the id of the abscence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/abscences/{id}")
    public ResponseEntity<Void> deleteAbscence(@PathVariable Long id) {
        log.debug("REST request to delete Abscence : {}", id);
        abscenceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
