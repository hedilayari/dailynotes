import { Injectable } from '@angular/core';
import { Note } from '../shared/note';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[] = [];
public loaded: boolean = false;
constructor(private storage: Storage) { }
async initStorage() {
await this.storage.create();

}
async load(){
  let notes = await this.storage.get('notes');
  if(notes) { this.notes = notes; this.loaded=true;}
  }
  async save() {
    await this.storage.set('notes', this.notes);
  }

  // Function to get a note by ID
  getNoteById(id:any): Note {
    const foundNote = this.notes.find(note => note.id === id);
    if (foundNote !== undefined) {
      return foundNote;
    } else {
      throw new Error(`Note with id ${id} not found`);
    }
  }
  //Création d'une note
createNote(title:string, content:string): void {
  // Création d'un identifiant unique pour la note
  let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;
  this.notes.push({
  id: id.toString(),
  title: title,
  content: content,
  time_stamp: new Date()
  });
  this.save();
  }
  // Suppression d'une note en fonction de son ID
deleteNote(note:any): void {
  // Récupération de l'index de la note dans la liste des notes
  let index = this.notes.indexOf(note);
  // Puis suppression de l'élément et Sauvegarde de la nouvelle liste
  if (index > -1) {
  this.notes.splice(index, 1);
  this.save();
  }

  }
  // Renvoie la dernière note
getLastNote(): Note {
  return this.notes[this.notes.length - 1];
  }
  
}
