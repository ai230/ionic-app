import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class UserServiceProvider {

    user = {} as User;
    constructor() {
        console.log('Hello UserServiceProvider Provider');
    }

    // setUser(email: string, uid: string) {
    //     this.user.email = email;
    //     this.user.uid = uid;
    // }

    // getuid() {
    //     return this.user.uid;
    // }

}