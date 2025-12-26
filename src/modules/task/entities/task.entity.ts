import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ColorTagEnum } from "../enums/color-tag.enum";
import { StateTagEnum } from "../enums/state-tag.enum";

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
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
