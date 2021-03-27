package com.ecoleprimaire.professeur.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.Duration;

/**
 * A Abscence.
 */
@Entity
@Table(name = "abscence")
public class Abscence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "heure_debut", nullable = false)
    private ZonedDateTime heureDebut;

    @NotNull
    @Column(name = "heure_fin", nullable = false)
    private ZonedDateTime heureFin;

    @Column(name = "nombre_heure")
    private Duration nombreHeure;

    @Column(name = "date_absence")
    private LocalDate dateAbsence;

    @NotNull
    @Column(name = "motif", nullable = false)
    private String motif;

    @ManyToOne
    @JsonIgnoreProperties(value = "abscences", allowSetters = true)
    private Professeur professeur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getHeureDebut() {
        return heureDebut;
    }

    public Abscence heureDebut(ZonedDateTime heureDebut) {
        this.heureDebut = heureDebut;
        return this;
    }

    public void setHeureDebut(ZonedDateTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public ZonedDateTime getHeureFin() {
        return heureFin;
    }

    public Abscence heureFin(ZonedDateTime heureFin) {
        this.heureFin = heureFin;
        return this;
    }

    public void setHeureFin(ZonedDateTime heureFin) {
        this.heureFin = heureFin;
    }

    public Duration getNombreHeure() {
        return nombreHeure;
    }

    public Abscence nombreHeure(Duration nombreHeure) {
        this.nombreHeure = nombreHeure;
        return this;
    }

    public void setNombreHeure(Duration nombreHeure) {
        this.nombreHeure = nombreHeure;
    }

    public LocalDate getDateAbsence() {
        return dateAbsence;
    }

    public Abscence dateAbsence(LocalDate dateAbsence) {
        this.dateAbsence = dateAbsence;
        return this;
    }

    public void setDateAbsence(LocalDate dateAbsence) {
        this.dateAbsence = dateAbsence;
    }

    public String getMotif() {
        return motif;
    }

    public Abscence motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Professeur getProfesseur() {
        return professeur;
    }

    public Abscence professeur(Professeur professeur) {
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
        if (!(o instanceof Abscence)) {
            return false;
        }
        return id != null && id.equals(((Abscence) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Abscence{" +
            "id=" + getId() +
            ", heureDebut='" + getHeureDebut() + "'" +
            ", heureFin='" + getHeureFin() + "'" +
            ", nombreHeure='" + getNombreHeure() + "'" +
            ", dateAbsence='" + getDateAbsence() + "'" +
            ", motif='" + getMotif() + "'" +
            "}";
    }
}
