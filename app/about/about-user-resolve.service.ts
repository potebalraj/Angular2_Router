import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Injectable()

export class AboutUserResolve implements Resolve<User>{

    constructor(private service: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        let firstName = route.params['firstName'];

        return this.service.getUser(firstName).then(user => {
            if (user) {
                return user;
            } else {
                //nevigate the user back to about page
                this.router.navigate(['/about']);
                return false;
            }
        });
    }
}