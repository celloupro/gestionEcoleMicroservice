package com.ecoleprimaire.ecole.web.rest;

import com.ecoleprimaire.ecole.InscriptionApp;
import com.ecoleprimaire.ecole.config.TestSecurityConfiguration;
import com.ecoleprimaire.ecole.domain.AnneeScolaire;
import com.ecoleprimaire.ecole.repository.AnneeScolaireRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AnneeScolaireResource} REST controller.
 */
@SpringBootTest(classes = { InscriptionApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AnneeScolaireResourceIT {

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AnneeScolaireRepository anneeScolaireRepository;

    @Mock
    private AnneeScolaireRepository anneeScolaireRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnneeScolaireMockMvc;

    private AnneeScolaire anneeScolaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnneeScolaire createEntity(EntityManager em) {
        AnneeScolaire anneeScolaire = new AnneeScolaire()
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN);
        return anneeScolaire;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnneeScolaire createUpdatedEntity(EntityManager em) {
        AnneeScolaire anneeScolaire = new AnneeScolaire()
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);
        return anneeScolaire;
    }

    @BeforeEach
    public void initTest() {
        anneeScolaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnneeScolaire() throws Exception {
        int databaseSizeBeforeCreate = anneeScolaireRepository.findAll().size();
        // Create the AnneeScolaire
        restAnneeScolaireMockMvc.perform(post("/api/annee-scolaires").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeScolaire)))
            .andExpect(status().isCreated());

        // Validate the AnneeScolaire in the database
        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeCreate + 1);
        AnneeScolaire testAnneeScolaire = anneeScolaireList.get(anneeScolaireList.size() - 1);
        assertThat(testAnneeScolaire.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testAnneeScolaire.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createAnneeScolaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anneeScolaireRepository.findAll().size();

        // Create the AnneeScolaire with an existing ID
        anneeScolaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnneeScolaireMockMvc.perform(post("/api/annee-scolaires").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeScolaire)))
            .andExpect(status().isBadRequest());

        // Validate the AnneeScolaire in the database
        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = anneeScolaireRepository.findAll().size();
        // set the field null
        anneeScolaire.setDateDebut(null);

        // Create the AnneeScolaire, which fails.


        restAnneeScolaireMockMvc.perform(post("/api/annee-scolaires").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeScolaire)))
            .andExpect(status().isBadRequest());

        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = anneeScolaireRepository.findAll().size();
        // set the field null
        anneeScolaire.setDateFin(null);

        // Create the AnneeScolaire, which fails.


        restAnneeScolaireMockMvc.perform(post("/api/annee-scolaires").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeScolaire)))
            .andExpect(status().isBadRequest());

        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnneeScolaires() throws Exception {
        // Initialize the database
        anneeScolaireRepository.saveAndFlush(anneeScolaire);

        // Get all the anneeScolaireList
        restAnneeScolaireMockMvc.perform(get("/api/annee-scolaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anneeScolaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAnneeScolairesWithEagerRelationshipsIsEnabled() throws Exception {
        when(anneeScolaireRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAnneeScolaireMockMvc.perform(get("/api/annee-scolaires?eagerload=true"))
            .andExpect(status().isOk());

        verify(anneeScolaireRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAnneeScolairesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(anneeScolaireRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAnneeScolaireMockMvc.perform(get("/api/annee-scolaires?eagerload=true"))
            .andExpect(status().isOk());

        verify(anneeScolaireRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAnneeScolaire() throws Exception {
        // Initialize the database
        anneeScolaireRepository.saveAndFlush(anneeScolaire);

        // Get the anneeScolaire
        restAnneeScolaireMockMvc.perform(get("/api/annee-scolaires/{id}", anneeScolaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(anneeScolaire.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAnneeScolaire() throws Exception {
        // Get the anneeScolaire
        restAnneeScolaireMockMvc.perform(get("/api/annee-scolaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnneeScolaire() throws Exception {
        // Initialize the database
        anneeScolaireRepository.saveAndFlush(anneeScolaire);

        int databaseSizeBeforeUpdate = anneeScolaireRepository.findAll().size();

        // Update the anneeScolaire
        AnneeScolaire updatedAnneeScolaire = anneeScolaireRepository.findById(anneeScolaire.getId()).get();
        // Disconnect from session so that the updates on updatedAnneeScolaire are not directly saved in db
        em.detach(updatedAnneeScolaire);
        updatedAnneeScolaire
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);

        restAnneeScolaireMockMvc.perform(put("/api/annee-scolaires").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnneeScolaire)))
            .andExpect(status().isOk());

        // Validate the AnneeScolaire in the database
        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeUpdate);
        AnneeScolaire testAnneeScolaire = anneeScolaireList.get(anneeScolaireList.size() - 1);
        assertThat(testAnneeScolaire.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testAnneeScolaire.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingAnneeScolaire() throws Exception {
        int databaseSizeBeforeUpdate = anneeScolaireRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnneeScolaireMockMvc.perform(put("/api/annee-scolaires").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeScolaire)))
            .andExpect(status().isBadRequest());

        // Validate the AnneeScolaire in the database
        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnneeScolaire() throws Exception {
        // Initialize the database
        anneeScolaireRepository.saveAndFlush(anneeScolaire);

        int databaseSizeBeforeDelete = anneeScolaireRepository.findAll().size();

        // Delete the anneeScolaire
        restAnneeScolaireMockMvc.perform(delete("/api/annee-scolaires/{id}", anneeScolaire.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AnneeScolaire> anneeScolaireList = anneeScolaireRepository.findAll();
        assertThat(anneeScolaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
