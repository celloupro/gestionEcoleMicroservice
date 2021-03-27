package com.ecoleprimaire.ecole.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Eleve.
 */
@Entity
@Table(name = "eleve")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Eleve implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "sexe", nullable = false)
    private String sexe;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @NotNull
    @Column(name = "lieu_naissance", nullable = false)
    private String lieuNaissance;

    @NotNull
    @Column(name = "matricule", nullable = false)
    private String matricule;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "eleve_parent",
               joinColumns = @JoinColumn(name = "eleve_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "parent_id", referencedColumnName = "id"))
    private Set<Parent> parents = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "eleve_classe",
               joinColumns = @JoinColumn(name = "eleve_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "classe_id", referencedColumnName = "id"))
    private Set<Classe> classes = new HashSet<>();

    @ManyToMany(mappedBy = "eleves")
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

    public byte[] getPhoto() {
        return photo;
    }

    public Eleve photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Eleve photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getNom() {
        return nom;
    }

    public Eleve nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Eleve prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getSexe() {
        return sexe;
    }

    public Eleve sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public Eleve dateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public Eleve lieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
        return this;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getMatricule() {
        return matricule;
    }

    public Eleve matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getAdresse() {
        return adresse;
    }

    public Eleve adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Set<Parent> getParents() {
        return parents;
    }

    public Eleve parents(Set<Parent> parents) {
        this.parents = parents;
        return this;
    }

    public Eleve addParent(Parent parent) {
        this.parents.add(parent);
        parent.getEleves().add(this);
        return this;
    }

    public Eleve removeParent(Parent parent) {
        this.parents.remove(parent);
        parent.getEleves().remove(this);
        return this;
    }

    public void setParents(Set<Parent> parents) {
        this.parents = parents;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public Eleve classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public Eleve addClasse(Classe classe) {
        this.classes.add(classe);
        classe.getEleves().add(this);
        return this;
    }

    public Eleve removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.getEleves().remove(this);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    public Set<AnneeScolaire> getAnneeScolaires() {
        return anneeScolaires;
    }

    public Eleve anneeScolaires(Set<AnneeScolaire> anneeScolaires) {
        this.anneeScolaires = anneeScolaires;
        return this;
    }

    public Eleve addAnneeScolaire(AnneeScolaire anneeScolaire) {
        this.anneeScolaires.add(anneeScolaire);
        anneeScolaire.getEleves().add(this);
        return this;
    }

    public Eleve removeAnneeScolaire(AnneeScolaire anneeScolaire) {
        this.anneeScolaires.remove(anneeScolaire);
        anneeScolaire.getEleves().remove(this);
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
        if (!(o instanceof Eleve)) {
            return false;
        }
        return id != null && id.equals(((Eleve) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Eleve{" +
            "id=" + getId() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", lieuNaissance='" + getLieuNaissance() + "'" +
            ", matricule='" + getMatricule() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
