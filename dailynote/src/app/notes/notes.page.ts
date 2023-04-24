import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor(private notesService: NotesService,
    private alertCtrl: AlertController) { }
    ngOnInit() { /** chargement des notes */ this.notesService.load().then(
    res => {console.log("Chargment des notes avec succès");}) }
    async addNote() {
    this.alertCtrl.create({
    header: 'Nouvelle note',
    inputs: [
    { type: 'text',name: 'title',placeholder: 'Intitulé de la note...'},
    { type: 'text',name: 'content',id: 'note-content',placeholder: 'Saisissez votre texte ici...'}
    ],
    buttons: [
    {text: 'Annuler'},
    {text: 'Ajouter',handler: (data) => {this.notesService.createNote(data.title, data.content);}}
    ]
    }).then((alert) => {alert.present();});
    }

}
