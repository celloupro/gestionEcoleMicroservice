package com.ecoleprimaire.professeur.web.rest;

import com.ecoleprimaire.professeur.ProfesseurApp;
import com.ecoleprimaire.professeur.config.TestSecurityConfiguration;
import com.ecoleprimaire.professeur.domain.Retard;
import com.ecoleprimaire.professeur.repository.RetardRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.ecoleprimaire.professeur.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RetardResource} REST controller.
 */
@SpringBootTest(classes = { ProfesseurApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class RetardResourceIT {

    private static final ZonedDateTime DEFAULT_HEURE_DEBUT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HEURE_DEBUT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_HEURE_FIN = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HEURE_FIN = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Duration DEFAULT_NOMBRE_HEURE = Duration.ofHours(6);
    private static final Duration UPDATED_NOMBRE_HEURE = Duration.ofHours(12);

    private static final LocalDate DEFAULT_DATE_RETARD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RETARD = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    @Autowired
    private RetardRepository retardRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRetardMockMvc;

    private Retard retard;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Retard createEntity(EntityManager em) {
        Retard retard = new Retard()
            .heureDebut(DEFAULT_HEURE_DEBUT)
            .heureFin(DEFAULT_HEURE_FIN)
            .nombreHeure(DEFAULT_NOMBRE_HEURE)
            .dateRetard(DEFAULT_DATE_RETARD)
            .motif(DEFAULT_MOTIF);
        return retard;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Retard createUpdatedEntity(EntityManager em) {
        Retard retard = new Retard()
            .heureDebut(UPDATED_HEURE_DEBUT)
            .heureFin(UPDATED_HEURE_FIN)
            .nombreHeure(UPDATED_NOMBRE_HEURE)
            .dateRetard(UPDATED_DATE_RETARD)
            .motif(UPDATED_MOTIF);
        return retard;
    }

    @BeforeEach
    public void initTest() {
        retard = createEntity(em);
    }

    @Test
    @Transactional
    public void createRetard() throws Exception {
        int databaseSizeBeforeCreate = retardRepository.findAll().size();
        // Create the Retard
        restRetardMockMvc.perform(post("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(retard)))
            .andExpect(status().isCreated());

        // Validate the Retard in the database
        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeCreate + 1);
        Retard testRetard = retardList.get(retardList.size() - 1);
        assertThat(testRetard.getHeureDebut()).isEqualTo(DEFAULT_HEURE_DEBUT);
        assertThat(testRetard.getHeureFin()).isEqualTo(DEFAULT_HEURE_FIN);
        assertThat(testRetard.getNombreHeure()).isEqualTo(DEFAULT_NOMBRE_HEURE);
        assertThat(testRetard.getDateRetard()).isEqualTo(DEFAULT_DATE_RETARD);
        assertThat(testRetard.getMotif()).isEqualTo(DEFAULT_MOTIF);
    }

    @Test
    @Transactional
    public void createRetardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = retardRepository.findAll().size();

        // Create the Retard with an existing ID
        retard.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRetardMockMvc.perform(post("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(retard)))
            .andExpect(status().isBadRequest());

        // Validate the Retard in the database
        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkHeureDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = retardRepository.findAll().size();
        // set the field null
        retard.setHeureDebut(null);

        // Create the Retard, which fails.


        restRetardMockMvc.perform(post("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(retard)))
            .andExpect(status().isBadRequest());

        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeureFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = retardRepository.findAll().size();
        // set the field null
        retard.setHeureFin(null);

        // Create the Retard, which fails.


        restRetardMockMvc.perform(post("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(retard)))
            .andExpect(status().isBadRequest());

        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMotifIsRequired() throws Exception {
        int databaseSizeBeforeTest = retardRepository.findAll().size();
        // set the field null
        retard.setMotif(null);

        // Create the Retard, which fails.


        restRetardMockMvc.perform(post("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(retard)))
            .andExpect(status().isBadRequest());

        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRetards() throws Exception {
        // Initialize the database
        retardRepository.saveAndFlush(retard);

        // Get all the retardList
        restRetardMockMvc.perform(get("/api/retards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(retard.getId().intValue())))
            .andExpect(jsonPath("$.[*].heureDebut").value(hasItem(sameInstant(DEFAULT_HEURE_DEBUT))))
            .andExpect(jsonPath("$.[*].heureFin").value(hasItem(sameInstant(DEFAULT_HEURE_FIN))))
            .andExpect(jsonPath("$.[*].nombreHeure").value(hasItem(DEFAULT_NOMBRE_HEURE.toString())))
            .andExpect(jsonPath("$.[*].dateRetard").value(hasItem(DEFAULT_DATE_RETARD.toString())))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF)));
    }
    
    @Test
    @Transactional
    public void getRetard() throws Exception {
        // Initialize the database
        retardRepository.saveAndFlush(retard);

        // Get the retard
        restRetardMockMvc.perform(get("/api/retards/{id}", retard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(retard.getId().intValue()))
            .andExpect(jsonPath("$.heureDebut").value(sameInstant(DEFAULT_HEURE_DEBUT)))
            .andExpect(jsonPath("$.heureFin").value(sameInstant(DEFAULT_HEURE_FIN)))
            .andExpect(jsonPath("$.nombreHeure").value(DEFAULT_NOMBRE_HEURE.toString()))
            .andExpect(jsonPath("$.dateRetard").value(DEFAULT_DATE_RETARD.toString()))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF));
    }
    @Test
    @Transactional
    public void getNonExistingRetard() throws Exception {
        // Get the retard
        restRetardMockMvc.perform(get("/api/retards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRetard() throws Exception {
        // Initialize the database
        retardRepository.saveAndFlush(retard);

        int databaseSizeBeforeUpdate = retardRepository.findAll().size();

        // Update the retard
        Retard updatedRetard = retardRepository.findById(retard.getId()).get();
        // Disconnect from session so that the updates on updatedRetard are not directly saved in db
        em.detach(updatedRetard);
        updatedRetard
            .heureDebut(UPDATED_HEURE_DEBUT)
            .heureFin(UPDATED_HEURE_FIN)
            .nombreHeure(UPDATED_NOMBRE_HEURE)
            .dateRetard(UPDATED_DATE_RETARD)
            .motif(UPDATED_MOTIF);

        restRetardMockMvc.perform(put("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRetard)))
            .andExpect(status().isOk());

        // Validate the Retard in the database
        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeUpdate);
        Retard testRetard = retardList.get(retardList.size() - 1);
        assertThat(testRetard.getHeureDebut()).isEqualTo(UPDATED_HEURE_DEBUT);
        assertThat(testRetard.getHeureFin()).isEqualTo(UPDATED_HEURE_FIN);
        assertThat(testRetard.getNombreHeure()).isEqualTo(UPDATED_NOMBRE_HEURE);
        assertThat(testRetard.getDateRetard()).isEqualTo(UPDATED_DATE_RETARD);
        assertThat(testRetard.getMotif()).isEqualTo(UPDATED_MOTIF);
    }

    @Test
    @Transactional
    public void updateNonExistingRetard() throws Exception {
        int databaseSizeBeforeUpdate = retardRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRetardMockMvc.perform(put("/api/retards").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(retard)))
            .andExpect(status().isBadRequest());

        // Validate the Retard in the database
        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRetard() throws Exception {
        // Initialize the database
        retardRepository.saveAndFlush(retard);

        int databaseSizeBeforeDelete = retardRepository.findAll().size();

        // Delete the retard
        restRetardMockMvc.perform(delete("/api/retards/{id}", retard.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Retard> retardList = retardRepository.findAll();
        assertThat(retardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
