package com.ecoleprimaire.ecole.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A AnneeScolaire.
 */
@Entity
@Table(name = "annee_scolaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AnneeScolaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @NotNull
    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "annee_scolaire_eleve",
               joinColumns = @JoinColumn(name = "annee_scolaire_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "eleve_id", referencedColumnName = "id"))
    private Set<Eleve> eleves = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "annee_scolaire_classe",
               joinColumns = @JoinColumn(name = "annee_scolaire_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "classe_id", referencedColumnName = "id"))
    private Set<Classe> classes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public AnneeScolaire dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public AnneeScolaire dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Set<Eleve> getEleves() {
        return eleves;
    }

    public AnneeScolaire eleves(Set<Eleve> eleves) {
        this.eleves = eleves;
        return this;
    }

    public AnneeScolaire addEleve(Eleve eleve) {
        this.eleves.add(eleve);
        eleve.getAnneeScolaires().add(this);
        return this;
    }

    public AnneeScolaire removeEleve(Eleve eleve) {
        this.eleves.remove(eleve);
        eleve.getAnneeScolaires().remove(this);
        return this;
    }

    public void setEleves(Set<Eleve> eleves) {
        this.eleves = eleves;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public AnneeScolaire classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public AnneeScolaire addClasse(Classe classe) {
        this.classes.add(classe);
        classe.getAnneeScolaires().add(this);
        return this;
    }

    public AnneeScolaire removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.getAnneeScolaires().remove(this);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnneeScolaire)) {
            return false;
        }
        return id != null && id.equals(((AnneeScolaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnneeScolaire{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
