import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { COLOR_TAG } from "../enums/color-tag.enum";
import { STATE_TAG } from "../enums/state-tag.enum";
import { UserEntity } from "src/modules/user/user.entity";

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.tasks, {eager: false})
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'color_tag'})
    colorTag: COLOR_TAG;

    @Column()
    state: STATE_TAG;

    @Column()
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
