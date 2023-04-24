import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { Note } from '../shared/note';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notes:{id:number,title:string,content:string}[]=[{"id":1,"title":"Faire les courses","content":"Acheter de quoi faire une bonne raclette . Diversifier les type de fromages"
},
{"id":2,"title":"Faire du sport","content":"Pensez a bien m'etirer avant de commencer,pour pour eviter toute courbature ou fracture "
},
{"id":3,"title":"PFE","content":"Preparer la soutenance de stage et contacter mon tuteur. "
},

]
note: Note = {id: '',title: '',content: ''};
constructor(private notesService: NotesService,
private alertCtrl: AlertController) {this.notesService.initStorage(); }
ngOnInit(){
  this.notesService.load().then(
  res => {
  this.note=this.notesService.getLastNote();
  }
  );
  }
//Ajout d'une note
async addNote() {
this.alertCtrl.create({
header: 'Nouvelle note',
inputs: [{ type: 'text', name: 'title',placeholder: 'Intitulé de la note...'},
{ type: 'text', name: 'content',id: 'note-content',placeholder: 'Saisissez votre texte ici...'}],
buttons: [{text: 'Annuler'},
{ text: 'Ajouter',handler: (data) => {this.notesService.createNote(data.title, data.content);
  this.note=this.notesService.getLastNote();
}}

]
}).then((alert) => {alert.present();
});
}



}