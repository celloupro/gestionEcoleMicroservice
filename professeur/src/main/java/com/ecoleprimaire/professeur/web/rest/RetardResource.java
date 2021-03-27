package com.ecoleprimaire.professeur.web.rest;

import com.ecoleprimaire.professeur.domain.Retard;
import com.ecoleprimaire.professeur.repository.RetardRepository;
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
 * REST controller for managing {@link com.ecoleprimaire.professeur.domain.Retard}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RetardResource {

    private final Logger log = LoggerFactory.getLogger(RetardResource.class);

    private static final String ENTITY_NAME = "professeurRetard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RetardRepository retardRepository;

    public RetardResource(RetardRepository retardRepository) {
        this.retardRepository = retardRepository;
    }

    /**
     * {@code POST  /retards} : Create a new retard.
     *
     * @param retard the retard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new retard, or with status {@code 400 (Bad Request)} if the retard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/retards")
    public ResponseEntity<Retard> createRetard(@Valid @RequestBody Retard retard) throws URISyntaxException {
        log.debug("REST request to save Retard : {}", retard);
        if (retard.getId() != null) {
            throw new BadRequestAlertException("A new retard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Retard result = retardRepository.save(retard);
        return ResponseEntity.created(new URI("/api/retards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /retards} : Updates an existing retard.
     *
     * @param retard the retard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated retard,
     * or with status {@code 400 (Bad Request)} if the retard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the retard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/retards")
    public ResponseEntity<Retard> updateRetard(@Valid @RequestBody Retard retard) throws URISyntaxException {
        log.debug("REST request to update Retard : {}", retard);
        if (retard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Retard result = retardRepository.save(retard);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, retard.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /retards} : get all the retards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of retards in body.
     */
    @GetMapping("/retards")
    public List<Retard> getAllRetards() {
        log.debug("REST request to get all Retards");
        return retardRepository.findAll();
    }

    /**
     * {@code GET  /retards/:id} : get the "id" retard.
     *
     * @param id the id of the retard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the retard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/retards/{id}")
    public ResponseEntity<Retard> getRetard(@PathVariable Long id) {
        log.debug("REST request to get Retard : {}", id);
        Optional<Retard> retard = retardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(retard);
    }

    /**
     * {@code DELETE  /retards/:id} : delete the "id" retard.
     *
     * @param id the id of the retard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/retards/{id}")
    public ResponseEntity<Void> deleteRetard(@PathVariable Long id) {
        log.debug("REST request to delete Retard : {}", id);
        retardRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
