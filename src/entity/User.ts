// import {
// 	Entity,
// 	PrimaryGeneratedColumn,
// 	Column,
// 	OneToMany,
// 	ManyToMany,
// 	CreateDateColumn,
// 	UpdateDateColumn
// } from 'typeorm';
// import { Image } from './Image';

// @Entity()
// export class User {
// 	@PrimaryGeneratedColumn('uuid')
// 	id: string;

// 	@Column()
// 	password: string;

// 	@Column()
// 	email: string;

// 	@ManyToMany((type) => Image, (Image) => Image.favoriters)
// 	favorites: Image[];

// 	@OneToMany((type) => Image, (Image) => Image.author)
// 	images: Image[];

// 	@CreateDateColumn()
// 	CreatedDate: Date;

// 	@UpdateDateColumn()
// 	UpdatedDate: Date;
// }
