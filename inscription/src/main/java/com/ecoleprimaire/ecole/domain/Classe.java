package com.ecoleprimaire.ecole.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Classe.
 */
@Entity
@Table(name = "classe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @ManyToOne
    @JsonIgnoreProperties(value = "classes", allowSetters = true)
    private Niveau classe;

    @ManyToMany(mappedBy = "classes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Eleve> eleves = new HashSet<>();

    @ManyToMany(mappedBy = "classes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<AnneeScolaire> anneeScolaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Classe libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Niveau getClasse() {
        return classe;
    }

    public Classe classe(Niveau niveau) {
        this.classe = niveau;
        return this;
    }

    public void setClasse(Niveau niveau) {
        this.classe = niveau;
    }

    public Set<Eleve> getEleves() {
        return eleves;
    }

    public Classe eleves(Set<Eleve> eleves) {
        this.eleves = eleves;
        return this;
    }

    public Classe addEleve(Eleve eleve) {
        this.eleves.add(eleve);
        eleve.getClasses().add(this);
        return this;
    }

    public Classe removeEleve(Eleve eleve) {
        this.eleves.remove(eleve);
        eleve.getClasses().remove(this);
        return this;
    }

    public void setEleves(Set<Eleve> eleves) {
        this.eleves = eleves;
    }

    public Set<AnneeScolaire> getAnneeScolaires() {
        return anneeScolaires;
    }

    public Classe anneeScolaires(Set<AnneeScolaire> anneeScolaires) {
        this.anneeScolaires = anneeScolaires;
        return this;
    }

    public Classe addAnneeScolaire(AnneeScolaire anneeScolaire) {
        this.anneeScolaires.add(anneeScolaire);
        anneeScolaire.getClasses().add(this);
        return this;
    }

    public Classe removeAnneeScolaire(AnneeScolaire anneeScolaire) {
        this.anneeScolaires.remove(anneeScolaire);
        anneeScolaire.getClasses().remove(this);
        return this;
    }

    public void setAnneeScolaires(Set<AnneeScolaire> anneeScolaires) {
        this.anneeScolaires = anneeScolaires;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Classe)) {
            return false;
        }
        return id != null && id.equals(((Classe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            "}";
    }
}
