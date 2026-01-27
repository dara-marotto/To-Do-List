import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ColorTagEnum } from "../enums/color-tag.enum";
import { StateTagEnum } from "../enums/state-tag.enum";
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

    @Column()
    colorTag: ColorTagEnum;

    @Column()
    state: StateTagEnum;

    @Column()
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
