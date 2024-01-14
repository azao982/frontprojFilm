import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../films.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
function dureeValidator(control: FormControl) {
  const duree = control.value;

  // Expression régulière pour vérifier le format hh:mm
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!regex.test(duree)) {
    // Retourne un objet avec la clé 'invalidFormat' si le format est invalide
    return { invalidFormat: true };
  }

  // Retourne null si le format est valide
  return null;
}
@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent implements OnInit {
  selectedGenre: string = '';
  genres: string[] = ['Action', 'Comédie', 'Drame', 'Science-fiction', 'Thriller'];
  filmForm:FormGroup;
  constructor(private FilmsService:FilmsService, private formBuilder:FormBuilder,private router:Router) { }
  onAjouter(){
    this.FilmsService.addFilms(this.filmForm.value).subscribe(data => console.log(data));
    // pour initialiser le formulaire de zero 
    
    this.filmForm.reset();
    // pour actualiser la page 
   window.location.reload();
    }
    ngOnInit(): void {
      this.filmForm = this.formBuilder.group({
      titre: ['', Validators.required],
      genre: [this.selectedGenre, Validators.required],
      anneeSortie: ['', Validators.required],
      realisateur: ['', Validators.required],
      duree: ['', [Validators.required, dureeValidator]],
    });
    }
  retour(){
    this.router.navigate(['/List'])
  }
}