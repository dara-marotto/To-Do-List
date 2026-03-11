import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskEntity } from "../../task/entities/task.entity";
import * as bcrypt from 'bcrypt';


@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.user, {
    cascade: true, 
  })
  tasks: TaskEntity[];

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: string;
}