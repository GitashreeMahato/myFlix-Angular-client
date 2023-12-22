import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    }
  ) {}
  ngOnInit(): void {
      
  }
}