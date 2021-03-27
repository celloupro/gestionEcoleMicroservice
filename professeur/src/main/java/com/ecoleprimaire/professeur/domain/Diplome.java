package com.ecoleprimaire.professeur.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Diplome.
 */
@Entity
@Table(name = "diplome")
public class Diplome implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "intitule", nullable = false)
    private String intitule;

    @NotNull
    @Column(name = "ecole", nullable = false)
    private String ecole;

    @NotNull
    @Column(name = "specialite", nullable = false)
    private String specialite;

    @NotNull
    @Column(name = "niveau", nullable = false)
    private String niveau;

    @Column(name = "date_obtention")
    private LocalDate dateObtention;

    @ManyToOne
    @JsonIgnoreProperties(value = "diplomes", allowSetters = true)
    private Professeur professeur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public Diplome intitule(String intitule) {
        this.intitule = intitule;
        return this;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public String getEcole() {
        return ecole;
    }

    public Diplome ecole(String ecole) {
        this.ecole = ecole;
        return this;
    }

    public void setEcole(String ecole) {
        this.ecole = ecole;
    }

    public String getSpecialite() {
        return specialite;
    }

    public Diplome specialite(String specialite) {
        this.specialite = specialite;
        return this;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public String getNiveau() {
        return niveau;
    }

    public Diplome niveau(String niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public LocalDate getDateObtention() {
        return dateObtention;
    }

    public Diplome dateObtention(LocalDate dateObtention) {
        this.dateObtention = dateObtention;
        return this;
    }

    public void setDateObtention(LocalDate dateObtention) {
        this.dateObtention = dateObtention;
    }

    public Professeur getProfesseur() {
        return professeur;
    }

    public Diplome professeur(Professeur professeur) {
        this.professeur = professeur;
        return this;
    }

    public void setProfesseur(Professeur professeur) {
        this.professeur = professeur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Diplome)) {
            return false;
        }
        return id != null && id.equals(((Diplome) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Diplome{" +
            "id=" + getId() +
            ", intitule='" + getIntitule() + "'" +
            ", ecole='" + getEcole() + "'" +
            ", specialite='" + getSpecialite() + "'" +
            ", niveau='" + getNiveau() + "'" +
            ", dateObtention='" + getDateObtention() + "'" +
            "}";
    }
}
