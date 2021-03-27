package com.ecoleprimaire.professeur.web.rest;

import com.ecoleprimaire.professeur.ProfesseurApp;
import com.ecoleprimaire.professeur.config.TestSecurityConfiguration;
import com.ecoleprimaire.professeur.domain.Diplome;
import com.ecoleprimaire.professeur.repository.DiplomeRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DiplomeResource} REST controller.
 */
@SpringBootTest(classes = { ProfesseurApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class DiplomeResourceIT {

    private static final String DEFAULT_INTITULE = "AAAAAAAAAA";
    private static final String UPDATED_INTITULE = "BBBBBBBBBB";

    private static final String DEFAULT_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIALITE = "AAAAAAAAAA";
    private static final String UPDATED_SPECIALITE = "BBBBBBBBBB";

    private static final String DEFAULT_NIVEAU = "AAAAAAAAAA";
    private static final String UPDATED_NIVEAU = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OBTENTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OBTENTION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private DiplomeRepository diplomeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiplomeMockMvc;

    private Diplome diplome;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diplome createEntity(EntityManager em) {
        Diplome diplome = new Diplome()
            .intitule(DEFAULT_INTITULE)
            .ecole(DEFAULT_ECOLE)
            .specialite(DEFAULT_SPECIALITE)
            .niveau(DEFAULT_NIVEAU)
            .dateObtention(DEFAULT_DATE_OBTENTION);
        return diplome;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diplome createUpdatedEntity(EntityManager em) {
        Diplome diplome = new Diplome()
            .intitule(UPDATED_INTITULE)
            .ecole(UPDATED_ECOLE)
            .specialite(UPDATED_SPECIALITE)
            .niveau(UPDATED_NIVEAU)
            .dateObtention(UPDATED_DATE_OBTENTION);
        return diplome;
    }

    @BeforeEach
    public void initTest() {
        diplome = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiplome() throws Exception {
        int databaseSizeBeforeCreate = diplomeRepository.findAll().size();
        // Create the Diplome
        restDiplomeMockMvc.perform(post("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isCreated());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeCreate + 1);
        Diplome testDiplome = diplomeList.get(diplomeList.size() - 1);
        assertThat(testDiplome.getIntitule()).isEqualTo(DEFAULT_INTITULE);
        assertThat(testDiplome.getEcole()).isEqualTo(DEFAULT_ECOLE);
        assertThat(testDiplome.getSpecialite()).isEqualTo(DEFAULT_SPECIALITE);
        assertThat(testDiplome.getNiveau()).isEqualTo(DEFAULT_NIVEAU);
        assertThat(testDiplome.getDateObtention()).isEqualTo(DEFAULT_DATE_OBTENTION);
    }

    @Test
    @Transactional
    public void createDiplomeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diplomeRepository.findAll().size();

        // Create the Diplome with an existing ID
        diplome.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiplomeMockMvc.perform(post("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIntituleIsRequired() throws Exception {
        int databaseSizeBeforeTest = diplomeRepository.findAll().size();
        // set the field null
        diplome.setIntitule(null);

        // Create the Diplome, which fails.


        restDiplomeMockMvc.perform(post("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isBadRequest());

        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEcoleIsRequired() throws Exception {
        int databaseSizeBeforeTest = diplomeRepository.findAll().size();
        // set the field null
        diplome.setEcole(null);

        // Create the Diplome, which fails.


        restDiplomeMockMvc.perform(post("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isBadRequest());

        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSpecialiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = diplomeRepository.findAll().size();
        // set the field null
        diplome.setSpecialite(null);

        // Create the Diplome, which fails.


        restDiplomeMockMvc.perform(post("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isBadRequest());

        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNiveauIsRequired() throws Exception {
        int databaseSizeBeforeTest = diplomeRepository.findAll().size();
        // set the field null
        diplome.setNiveau(null);

        // Create the Diplome, which fails.


        restDiplomeMockMvc.perform(post("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isBadRequest());

        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDiplomes() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        // Get all the diplomeList
        restDiplomeMockMvc.perform(get("/api/diplomes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diplome.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE)))
            .andExpect(jsonPath("$.[*].ecole").value(hasItem(DEFAULT_ECOLE)))
            .andExpect(jsonPath("$.[*].specialite").value(hasItem(DEFAULT_SPECIALITE)))
            .andExpect(jsonPath("$.[*].niveau").value(hasItem(DEFAULT_NIVEAU)))
            .andExpect(jsonPath("$.[*].dateObtention").value(hasItem(DEFAULT_DATE_OBTENTION.toString())));
    }
    
    @Test
    @Transactional
    public void getDiplome() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        // Get the diplome
        restDiplomeMockMvc.perform(get("/api/diplomes/{id}", diplome.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diplome.getId().intValue()))
            .andExpect(jsonPath("$.intitule").value(DEFAULT_INTITULE))
            .andExpect(jsonPath("$.ecole").value(DEFAULT_ECOLE))
            .andExpect(jsonPath("$.specialite").value(DEFAULT_SPECIALITE))
            .andExpect(jsonPath("$.niveau").value(DEFAULT_NIVEAU))
            .andExpect(jsonPath("$.dateObtention").value(DEFAULT_DATE_OBTENTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDiplome() throws Exception {
        // Get the diplome
        restDiplomeMockMvc.perform(get("/api/diplomes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiplome() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();

        // Update the diplome
        Diplome updatedDiplome = diplomeRepository.findById(diplome.getId()).get();
        // Disconnect from session so that the updates on updatedDiplome are not directly saved in db
        em.detach(updatedDiplome);
        updatedDiplome
            .intitule(UPDATED_INTITULE)
            .ecole(UPDATED_ECOLE)
            .specialite(UPDATED_SPECIALITE)
            .niveau(UPDATED_NIVEAU)
            .dateObtention(UPDATED_DATE_OBTENTION);

        restDiplomeMockMvc.perform(put("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiplome)))
            .andExpect(status().isOk());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
        Diplome testDiplome = diplomeList.get(diplomeList.size() - 1);
        assertThat(testDiplome.getIntitule()).isEqualTo(UPDATED_INTITULE);
        assertThat(testDiplome.getEcole()).isEqualTo(UPDATED_ECOLE);
        assertThat(testDiplome.getSpecialite()).isEqualTo(UPDATED_SPECIALITE);
        assertThat(testDiplome.getNiveau()).isEqualTo(UPDATED_NIVEAU);
        assertThat(testDiplome.getDateObtention()).isEqualTo(UPDATED_DATE_OBTENTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDiplome() throws Exception {
        int databaseSizeBeforeUpdate = diplomeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiplomeMockMvc.perform(put("/api/diplomes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diplome)))
            .andExpect(status().isBadRequest());

        // Validate the Diplome in the database
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiplome() throws Exception {
        // Initialize the database
        diplomeRepository.saveAndFlush(diplome);

        int databaseSizeBeforeDelete = diplomeRepository.findAll().size();

        // Delete the diplome
        restDiplomeMockMvc.perform(delete("/api/diplomes/{id}", diplome.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Diplome> diplomeList = diplomeRepository.findAll();
        assertThat(diplomeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
