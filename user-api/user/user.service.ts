import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import {UserRepository} from "./user.repository";
import {SignUpDto} from "../auth/dto/sign-up.dto";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async create({username, password}: SignUpDto): Promise<User> {
        return this.userRepository.create(username, password);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findByUsername(username);
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}