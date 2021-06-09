import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt";
import { Comment } from "./Comment";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @Length(4, 20)
    username: string;

    @Column("text")
    @Length(4, 100)
    password: string;

    @Column({ name: 'created_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: string;

    @OneToMany(type => Comment, comment => comment.user) // note: we will create author property in the Photo class below
    comments: Comment[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    public static mockTestUser(): User {
		const user: User = new User();

		user.id = 1;
		user.firstName = 'femi';
		user.lastName = 'bamidele';
		user.username = 'femibams';

		return user;
	}

}
