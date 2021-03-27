package com.ecoleprimaire.professeur.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.ecoleprimaire.professeur.domain.enumeration.Sexe;

/**
 * A Professeur.
 */
@Entity
@Table(name = "professeur")
public class Professeur implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe")
    private Sexe sexe;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @NotNull
    @Column(name = "lieu_naissance", nullable = false)
    private String lieuNaissance;

    @NotNull
    @Column(name = "tel", nullable = false)
    private String tel;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @OneToMany(mappedBy = "professeur")
    private Set<Diplome> diplomes = new HashSet<>();

    @OneToMany(mappedBy = "professeur")
    private Set<Retard> retards = new HashSet<>();

    @OneToMany(mappedBy = "professeur")
    private Set<Abscence> abscences = new HashSet<>();

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

    public Professeur photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Professeur photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getNom() {
        return nom;
    }

    public Professeur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Professeur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public Professeur sexe(Sexe sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public Professeur dateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public Professeur lieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
        return this;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getTel() {
        return tel;
    }

    public Professeur tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAdresse() {
        return adresse;
    }

    public Professeur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Set<Diplome> getDiplomes() {
        return diplomes;
    }

    public Professeur diplomes(Set<Diplome> diplomes) {
        this.diplomes = diplomes;
        return this;
    }

    public Professeur addDiplome(Diplome diplome) {
        this.diplomes.add(diplome);
        diplome.setProfesseur(this);
        return this;
    }

    public Professeur removeDiplome(Diplome diplome) {
        this.diplomes.remove(diplome);
        diplome.setProfesseur(null);
        return this;
    }

    public void setDiplomes(Set<Diplome> diplomes) {
        this.diplomes = diplomes;
    }

    public Set<Retard> getRetards() {
        return retards;
    }

    public Professeur retards(Set<Retard> retards) {
        this.retards = retards;
        return this;
    }

    public Professeur addRetard(Retard retard) {
        this.retards.add(retard);
        retard.setProfesseur(this);
        return this;
    }

    public Professeur removeRetard(Retard retard) {
        this.retards.remove(retard);
        retard.setProfesseur(null);
        return this;
    }

    public void setRetards(Set<Retard> retards) {
        this.retards = retards;
    }

    public Set<Abscence> getAbscences() {
        return abscences;
    }

    public Professeur abscences(Set<Abscence> abscences) {
        this.abscences = abscences;
        return this;
    }

    public Professeur addAbscence(Abscence abscence) {
        this.abscences.add(abscence);
        abscence.setProfesseur(this);
        return this;
    }

    public Professeur removeAbscence(Abscence abscence) {
        this.abscences.remove(abscence);
        abscence.setProfesseur(null);
        return this;
    }

    public void setAbscences(Set<Abscence> abscences) {
        this.abscences = abscences;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Professeur)) {
            return false;
        }
        return id != null && id.equals(((Professeur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Professeur{" +
            "id=" + getId() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", lieuNaissance='" + getLieuNaissance() + "'" +
            ", tel='" + getTel() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
