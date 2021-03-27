package com.ecoleprimaire.professeur.web.rest;

import com.ecoleprimaire.professeur.ProfesseurApp;
import com.ecoleprimaire.professeur.config.TestSecurityConfiguration;
import com.ecoleprimaire.professeur.domain.Abscence;
import com.ecoleprimaire.professeur.repository.AbscenceRepository;

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
 * Integration tests for the {@link AbscenceResource} REST controller.
 */
@SpringBootTest(classes = { ProfesseurApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class AbscenceResourceIT {

    private static final ZonedDateTime DEFAULT_HEURE_DEBUT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HEURE_DEBUT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_HEURE_FIN = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HEURE_FIN = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Duration DEFAULT_NOMBRE_HEURE = Duration.ofHours(6);
    private static final Duration UPDATED_NOMBRE_HEURE = Duration.ofHours(12);

    private static final LocalDate DEFAULT_DATE_ABSENCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ABSENCE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    @Autowired
    private AbscenceRepository abscenceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAbscenceMockMvc;

    private Abscence abscence;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abscence createEntity(EntityManager em) {
        Abscence abscence = new Abscence()
            .heureDebut(DEFAULT_HEURE_DEBUT)
            .heureFin(DEFAULT_HEURE_FIN)
            .nombreHeure(DEFAULT_NOMBRE_HEURE)
            .dateAbsence(DEFAULT_DATE_ABSENCE)
            .motif(DEFAULT_MOTIF);
        return abscence;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abscence createUpdatedEntity(EntityManager em) {
        Abscence abscence = new Abscence()
            .heureDebut(UPDATED_HEURE_DEBUT)
            .heureFin(UPDATED_HEURE_FIN)
            .nombreHeure(UPDATED_NOMBRE_HEURE)
            .dateAbsence(UPDATED_DATE_ABSENCE)
            .motif(UPDATED_MOTIF);
        return abscence;
    }

    @BeforeEach
    public void initTest() {
        abscence = createEntity(em);
    }

    @Test
    @Transactional
    public void createAbscence() throws Exception {
        int databaseSizeBeforeCreate = abscenceRepository.findAll().size();
        // Create the Abscence
        restAbscenceMockMvc.perform(post("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abscence)))
            .andExpect(status().isCreated());

        // Validate the Abscence in the database
        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeCreate + 1);
        Abscence testAbscence = abscenceList.get(abscenceList.size() - 1);
        assertThat(testAbscence.getHeureDebut()).isEqualTo(DEFAULT_HEURE_DEBUT);
        assertThat(testAbscence.getHeureFin()).isEqualTo(DEFAULT_HEURE_FIN);
        assertThat(testAbscence.getNombreHeure()).isEqualTo(DEFAULT_NOMBRE_HEURE);
        assertThat(testAbscence.getDateAbsence()).isEqualTo(DEFAULT_DATE_ABSENCE);
        assertThat(testAbscence.getMotif()).isEqualTo(DEFAULT_MOTIF);
    }

    @Test
    @Transactional
    public void createAbscenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = abscenceRepository.findAll().size();

        // Create the Abscence with an existing ID
        abscence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbscenceMockMvc.perform(post("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abscence)))
            .andExpect(status().isBadRequest());

        // Validate the Abscence in the database
        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkHeureDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = abscenceRepository.findAll().size();
        // set the field null
        abscence.setHeureDebut(null);

        // Create the Abscence, which fails.


        restAbscenceMockMvc.perform(post("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abscence)))
            .andExpect(status().isBadRequest());

        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHeureFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = abscenceRepository.findAll().size();
        // set the field null
        abscence.setHeureFin(null);

        // Create the Abscence, which fails.


        restAbscenceMockMvc.perform(post("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abscence)))
            .andExpect(status().isBadRequest());

        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMotifIsRequired() throws Exception {
        int databaseSizeBeforeTest = abscenceRepository.findAll().size();
        // set the field null
        abscence.setMotif(null);

        // Create the Abscence, which fails.


        restAbscenceMockMvc.perform(post("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abscence)))
            .andExpect(status().isBadRequest());

        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAbscences() throws Exception {
        // Initialize the database
        abscenceRepository.saveAndFlush(abscence);

        // Get all the abscenceList
        restAbscenceMockMvc.perform(get("/api/abscences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(abscence.getId().intValue())))
            .andExpect(jsonPath("$.[*].heureDebut").value(hasItem(sameInstant(DEFAULT_HEURE_DEBUT))))
            .andExpect(jsonPath("$.[*].heureFin").value(hasItem(sameInstant(DEFAULT_HEURE_FIN))))
            .andExpect(jsonPath("$.[*].nombreHeure").value(hasItem(DEFAULT_NOMBRE_HEURE.toString())))
            .andExpect(jsonPath("$.[*].dateAbsence").value(hasItem(DEFAULT_DATE_ABSENCE.toString())))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF)));
    }
    
    @Test
    @Transactional
    public void getAbscence() throws Exception {
        // Initialize the database
        abscenceRepository.saveAndFlush(abscence);

        // Get the abscence
        restAbscenceMockMvc.perform(get("/api/abscences/{id}", abscence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(abscence.getId().intValue()))
            .andExpect(jsonPath("$.heureDebut").value(sameInstant(DEFAULT_HEURE_DEBUT)))
            .andExpect(jsonPath("$.heureFin").value(sameInstant(DEFAULT_HEURE_FIN)))
            .andExpect(jsonPath("$.nombreHeure").value(DEFAULT_NOMBRE_HEURE.toString()))
            .andExpect(jsonPath("$.dateAbsence").value(DEFAULT_DATE_ABSENCE.toString()))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF));
    }
    @Test
    @Transactional
    public void getNonExistingAbscence() throws Exception {
        // Get the abscence
        restAbscenceMockMvc.perform(get("/api/abscences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAbscence() throws Exception {
        // Initialize the database
        abscenceRepository.saveAndFlush(abscence);

        int databaseSizeBeforeUpdate = abscenceRepository.findAll().size();

        // Update the abscence
        Abscence updatedAbscence = abscenceRepository.findById(abscence.getId()).get();
        // Disconnect from session so that the updates on updatedAbscence are not directly saved in db
        em.detach(updatedAbscence);
        updatedAbscence
            .heureDebut(UPDATED_HEURE_DEBUT)
            .heureFin(UPDATED_HEURE_FIN)
            .nombreHeure(UPDATED_NOMBRE_HEURE)
            .dateAbsence(UPDATED_DATE_ABSENCE)
            .motif(UPDATED_MOTIF);

        restAbscenceMockMvc.perform(put("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAbscence)))
            .andExpect(status().isOk());

        // Validate the Abscence in the database
        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeUpdate);
        Abscence testAbscence = abscenceList.get(abscenceList.size() - 1);
        assertThat(testAbscence.getHeureDebut()).isEqualTo(UPDATED_HEURE_DEBUT);
        assertThat(testAbscence.getHeureFin()).isEqualTo(UPDATED_HEURE_FIN);
        assertThat(testAbscence.getNombreHeure()).isEqualTo(UPDATED_NOMBRE_HEURE);
        assertThat(testAbscence.getDateAbsence()).isEqualTo(UPDATED_DATE_ABSENCE);
        assertThat(testAbscence.getMotif()).isEqualTo(UPDATED_MOTIF);
    }

    @Test
    @Transactional
    public void updateNonExistingAbscence() throws Exception {
        int databaseSizeBeforeUpdate = abscenceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAbscenceMockMvc.perform(put("/api/abscences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abscence)))
            .andExpect(status().isBadRequest());

        // Validate the Abscence in the database
        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAbscence() throws Exception {
        // Initialize the database
        abscenceRepository.saveAndFlush(abscence);

        int databaseSizeBeforeDelete = abscenceRepository.findAll().size();

        // Delete the abscence
        restAbscenceMockMvc.perform(delete("/api/abscences/{id}", abscence.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Abscence> abscenceList = abscenceRepository.findAll();
        assertThat(abscenceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
