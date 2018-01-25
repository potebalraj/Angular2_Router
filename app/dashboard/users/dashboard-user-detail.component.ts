import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
    template: `
        <div class="jumbotron">
            <div *ngIf="user">
                <h2>{{user.firstName}}</h2>

                <div class="form-group">
                    <input type="text" [(ngModel)]="editName" class="form-control">
                </div>

                <div class=""form-group text-center>
                    <button (click)="cancel()" class="btn btn-danger">Cancel</button>
                    <button (click)="save()" class="btn btn-success">Save</button>
                </div>         

            </div>
        </div>
`
})

export class DashboardUserDetailComponent implements OnInit {

    user: User;
    editName: string;

    constructor(
        private service: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {

        this.route.params.forEach(params => {
            let firstName = params['firstName'];
            this.service.getUser(firstName).then(user => {
                this.user = user;
                this.editName = user.firstName;
            });
        });        
    }

    save() {
        this.user.firstName = this.editName;
        this.router.navigate(['dashboard/users']);


    }

    //dont save . Nevigate to dashboard
    cancel() {
        this.router.navigate(['dashboard/users']);
    }

    canDeactivate() {
        console.log('I am nevigating away');

        if (this.user.firstName !== this.editName) {
            return window.confirm('Discard changes ?');
        }
        return true;
    }
}