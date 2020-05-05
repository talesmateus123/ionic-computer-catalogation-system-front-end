import { Injectable } from '@angular/core';
import { CredentialsDTO } from '../models';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient,
        public storageService: StorageService) {
    }

    authenticate(credentials: CredentialsDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}login`, 
            credentials,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.setLocalUser(null);
    }

}