import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    episode_id: number;

    @Column("text")
    @Length(1, 500)
    text: string;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @Column({ name: 'created_at', type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: string;
}
