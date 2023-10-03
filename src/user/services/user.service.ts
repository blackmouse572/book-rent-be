import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthPassword } from 'src/auth/interfaces/auth.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { HelperDateService } from 'src/common/helpers/services/helper.date.service';
import { HelperStringService } from 'src/common/helpers/services/helper.string.service';
import { UserCreateDto } from 'src/user/dtos/create-user.dto';
import { UserUpdateNameDto } from 'src/user/dtos/update-name.dto';
import { IUserEntity } from 'src/user/interfaces/user.interface';
import { IUserService } from 'src/user/interfaces/user.service.interfaces';
import { UserDoc, UserEntity } from 'src/user/repository/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class UserService implements IUserService {
    private readonly authMaxPasswordAttempt: number;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly helperDateService: HelperDateService,
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService
    ) {
        this.authMaxPasswordAttempt = this.configService.get<number>(
            'auth.password.maxAttempt'
        );
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<IUserEntity[]> {
        return this.userRepository.findAll<IUserEntity>(find, {
            ...options,
            join: true,
        });
    }

    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.userRepository.findOneById<T>(_id, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.userRepository.findOne<T>(find, options);
    }

    async findOneByUsername<T>(
        username: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.userRepository.findOne<T>({ username }, options);
    }

    async findOneByEmail<T>(
        email: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.userRepository.findOne<T>({ email }, options);
    }

    async findOneByMobileNumber<T>(
        mobileNumber: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.userRepository.findOne<T>({ mobileNumber }, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.userRepository.getTotal(find, { ...options, join: true });
    }

    async create(
        { email, fullName, phone }: UserCreateDto,
        { passwordHash, salt }: IAuthPassword,
        options?: IDatabaseCreateOptions
    ): Promise<UserDoc> {
        const create: UserEntity = new UserEntity();
        create.email = email;
        create.password = passwordHash;
        create.fullName = fullName;
        create.phone = phone;
        create.isActive = true;
        create.inactivePermanent = false;
        create.blocked = false;
        create.salt = salt;
        create.passwordAttempt = 0;

        return this.userRepository.create<UserEntity>(create, options);
    }

    async existByEmail(
        email: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            {
                email: {
                    $regex: new RegExp(`\\b${email}\\b`),
                    $options: 'i',
                },
            },
            { ...options, withDeleted: true }
        );
    }

    async existByMobileNumber(
        mobileNumber: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            {
                mobileNumber,
            },
            { ...options, withDeleted: true }
        );
    }

    async existByUsername(
        username: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            { username },
            { ...options, withDeleted: true }
        );
    }

    async delete(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        return this.userRepository.softDelete(repository, options);
    }

    async updateName(
        repository: UserDoc,
        { fullName }: UserUpdateNameDto,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.fullName = fullName;

        return this.userRepository.save(repository, options);
    }

    async updatePhoto(
        repository: UserDoc,
        photo: string,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.avatar = photo;

        return this.userRepository.save(repository, options);
    }

    async updatePassword(
        repository: UserDoc,
        { passwordHash, salt }: IAuthPassword,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.password = passwordHash;
        repository.salt = salt;

        return this.userRepository.save(repository, options);
    }

    async active(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserEntity> {
        repository.isActive = true;
        repository.inactiveDate = undefined;

        return this.userRepository.save(repository, options);
    }

    async inactive(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.isActive = false;
        repository.inactiveDate = this.helperDateService.create();

        return this.userRepository.save(repository, options);
    }

    async inactivePermanent(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.isActive = false;
        repository.inactivePermanent = true;
        repository.inactiveDate = this.helperDateService.create();

        return this.userRepository.save(repository, options);
    }

    async blocked(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.blocked = true;
        repository.blockedDate = this.helperDateService.create();

        return this.userRepository.save(repository, options);
    }

    async unblocked(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.blocked = false;
        repository.blockedDate = undefined;

        return this.userRepository.save(repository, options);
    }

    async maxPasswordAttempt(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.passwordAttempt = this.authMaxPasswordAttempt;

        return this.userRepository.save(repository, options);
    }

    async increasePasswordAttempt(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.passwordAttempt = ++repository.passwordAttempt;

        return this.userRepository.save(repository, options);
    }

    async resetPasswordAttempt(
        repository: UserDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserDoc> {
        repository.passwordAttempt = 0;

        return this.userRepository.save(repository, options);
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.userRepository.deleteMany(find, options);
    }
}
