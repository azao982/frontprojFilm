    export class Film {
    _id:string;
    titre: string;
    genre: string;
    realisateur: string;
    duree:string;
    anneeSortie:Date| string;
    constructor(_id:string,titre: string, genre: string, duree: string,realisateur:string,anneeSortie:Date) {
        this._id=_id;
        this.titre = titre;
        this.genre= genre;
        this.duree = duree;
        this.realisateur=realisateur;
        this.anneeSortie=anneeSortie;
    }
}
 