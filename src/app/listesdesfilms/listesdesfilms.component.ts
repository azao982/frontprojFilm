import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../films.service';
import { Router } from '@angular/router';
import { Film } from '../film';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listesdesfilms',
  templateUrl: './listesdesfilms.component.html',
  styleUrls: ['./listesdesfilms.component.css']
})
export class listesdesfilmsComponent implements OnInit {

  films: Film[] = [];
  searchKeyword: string = '';
  searchResults: Film[] = [];
  selectedFilm:  Film | undefined;

  constructor(private filmsService: FilmsService, private router: Router) {}

  ngOnInit(): void {
    this.getFilms();
  }

  private getFilms() {

    this.filmsService.getListeFilms().subscribe(data => {
      if (Array.isArray(data)) {
        this.films = data;
      } else {
        console.error('La réponse n\'est pas un tableau :', data);
      }
    });
  }
  supprimerFilm(id: string): void {
    if (!id) {
      console.error("L'ID du film est indéfini.");
      return;
    }
    // Demander confirmation avant la suppression
    const confirmation = window.confirm('Voulez-vous vraiment supprimer ce film ?');
  
    if (!confirmation) {
      // L'utilisateur a annulé la suppression
      return;
    }
  
    console.log('ID du film à supprimer :', id);
  
    this.filmsService.supprimerFilm(id).subscribe(
      () => {
        // Suppression réussie, mettre à jour la liste des films
        this.getFilms();
      },
      error => {
        console.error('Échec de la suppression du film :', error);
  
        if (error instanceof HttpErrorResponse) {
          try {
            const errorObject = JSON.parse(error.error);
            console.log('Contenu de l\'erreur :', errorObject);
          } catch (jsonError) {
            console.log('Erreur lors de l\'analyse JSON de la réponse.');
            console.log('Réponse brute du serveur :', error.error);
          }
        }
      }
    );
  }  
  redirigerVersPagemodifier(_id:string){
  this.router.navigate(['/modifier',_id]);
  }
  redirigerVersPageajoute(){
    this.router.navigate(['/ajout'])
  }

  searchFilm(): void {
    this.filmsService.searchFilm(this.searchKeyword)
      .subscribe((result: any) => {
        console.log(result);
  
        // Vérifiez si 'results' est une tableau non vide
        if (result && result.results && result.results.length > 0) {
          // Assurez-vous que la clé 'results' existe dans votre réponse JSON
          // Assignez tous les résultats à searchResults
          this.searchResults = result.results;
        } else {
          // Ajustez le comportement en cas de résultats vides ou de structure JSON incorrecte
          this.searchResults = [];
          alert("Aucun résultat trouvé.");
        }
        if (!this.searchKeyword) {
          // Show alert if search input is empty
          alert('Entrez film à rechercher !! ');
          return;
        }
      });
  }
  trierParTitre(): void {
    this.films.sort((a, b) => a.titre.localeCompare(b.titre));
  }

  // Méthode pour trier les films par année de sortie
  trierParAnneeSortie(): void {
    this.films.sort((a, b) => new Date(a.anneeSortie).getTime() - new Date(b.anneeSortie).getTime());
  }
  showDetails(film: Film): void {
    this.selectedFilm = film;
  }
}  