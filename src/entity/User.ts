import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Image } from './Image';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userName: string;

	@Column()
	fullName: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	favorites: Image[];

	@Column()
	images: Image[];
}
