// import {
// 	Entity,
// 	PrimaryGeneratedColumn,
// 	Column,
// 	ManyToOne,
// 	ManyToMany,
// 	JoinTable,
// 	CreateDateColumn,
// 	UpdateDateColumn
// } from 'typeorm';
// import { User } from './User';

// @Entity()
// export class Image {
// 	@PrimaryGeneratedColumn('uuid')
// 	id: string;

// 	@Column()
// 	title: string;

// 	@Column()
// 	resolution: string;

// 	@Column()
// 	views: number;

// 	@Column()
// 	favorites: number;

// 	@Column({ array: true })
// 	tags: string;

// 	@ManyToOne((type) => User, (User) => User.images)
// 	author: User;

// 	@ManyToMany((type) => User, (User) => User.favorites)
// 	@JoinTable()
// 	favoriters: User;

// 	@CreateDateColumn()
// 	CreatedDate: Date;

// 	@UpdateDateColumn()
// 	UpdatedDate: Date;
// }
