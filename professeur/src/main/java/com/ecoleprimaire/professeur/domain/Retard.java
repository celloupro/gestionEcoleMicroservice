package com.ecoleprimaire.professeur.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.Duration;

/**
 * A Retard.
 */
@Entity
@Table(name = "retard")
public class Retard implements Serializable {

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

    @Column(name = "date_retard")
    private LocalDate dateRetard;

    @NotNull
    @Column(name = "motif", nullable = false)
    private String motif;

    @ManyToOne
    @JsonIgnoreProperties(value = "retards", allowSetters = true)
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

    public Retard heureDebut(ZonedDateTime heureDebut) {
        this.heureDebut = heureDebut;
        return this;
    }

    public void setHeureDebut(ZonedDateTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public ZonedDateTime getHeureFin() {
        return heureFin;
    }

    public Retard heureFin(ZonedDateTime heureFin) {
        this.heureFin = heureFin;
        return this;
    }

    public void setHeureFin(ZonedDateTime heureFin) {
        this.heureFin = heureFin;
    }

    public Duration getNombreHeure() {
        return nombreHeure;
    }

    public Retard nombreHeure(Duration nombreHeure) {
        this.nombreHeure = nombreHeure;
        return this;
    }

    public void setNombreHeure(Duration nombreHeure) {
        this.nombreHeure = nombreHeure;
    }

    public LocalDate getDateRetard() {
        return dateRetard;
    }

    public Retard dateRetard(LocalDate dateRetard) {
        this.dateRetard = dateRetard;
        return this;
    }

    public void setDateRetard(LocalDate dateRetard) {
        this.dateRetard = dateRetard;
    }

    public String getMotif() {
        return motif;
    }

    public Retard motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Professeur getProfesseur() {
        return professeur;
    }

    public Retard professeur(Professeur professeur) {
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
        if (!(o instanceof Retard)) {
            return false;
        }
        return id != null && id.equals(((Retard) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Retard{" +
            "id=" + getId() +
            ", heureDebut='" + getHeureDebut() + "'" +
            ", heureFin='" + getHeureFin() + "'" +
            ", nombreHeure='" + getNombreHeure() + "'" +
            ", dateRetard='" + getDateRetard() + "'" +
            ", motif='" + getMotif() + "'" +
            "}";
    }
}
