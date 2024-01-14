import { Component } from '@angular/core';
import { FilmsService } from '../films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from '../film';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modifierfilms',
  templateUrl: './modifierfilms.component.html',
  styleUrls: ['./modifierfilms.component.css']
})
export class modifierfilmsComponent {
  filmForm:FormGroup;
  selectedGenre: string = '';
  genres: string[] = ['Action', 'Comédie', 'Drame', 'Science-fiction', 'Thriller'];
  constructor(private filmService: FilmsService, private activatedRoute: ActivatedRoute,private router:Router,private fb:FormBuilder) {}
  ngOnInit(): void {
    this.initFilmForm();
    const _id: any = this.activatedRoute.snapshot.paramMap.get('_id');
    this.filmService.getById(_id).subscribe(films => {
      this.films = films;
      const formattedDate = formatDate(this.films.anneeSortie, 'yyyy-MM-dd', 'en-US');
      // Mettez à jour le formulaire avec les valeurs récupérées
      this.filmForm.patchValue({
        titre: this.films.titre,
        genre: this.films.genre,
        anneeSortie: formattedDate,
        realisateur: this.films.realisateur,
        duree: this.films.duree
      });
    });
  }

  initFilmForm(): void {
    this.filmForm = this.fb.group({
      titre: ['', Validators.required],
      genre: ['', Validators.required],
      anneeSortie: ['', Validators.required],
      realisateur: ['', Validators.required],
      duree: ['', Validators.required]
    });
  }

  films: Film = {
    _id: '',
    titre: '',
    genre: '',
    duree: '',
    realisateur: '',
    anneeSortie:new Date(),
  };

  onUpdate() {
    // Access all form data from 'formData' object
    console.log('Form Data:', this.filmForm.value);

    // Appeler la fonction de mise à jour du service
    this.filmService.updateFilms(this.filmForm.value, this.films._id).subscribe(
      () => {
        alert('Le film a été modifié avec succès!'); // Use alert for success message
        // Rediriger vers la liste des films après la mise à jour
        this.router.navigate(['/List']);
      },
      error => {
        alert('Une erreur s\'est produite lors de la modification du film.'); // Use alert for error message
      }
    );
  }

  retour() {
    this.router.navigate(['/List']);
  }
}