import knex from 'knex';
import pg from 'pg';
// @ts-ignore
import setUpPaginator from 'knex-paginator';

export const db = knex({
	client: 'pg',
	connection: {
		host: `${process.env.POSTGRES_HOST}`,
		user: `${process.env.POSTGRES_USER}`,
		password: `${process.env.POSTGRES_PASSWORD}`,
		database: `${process.env.POSTGRES_DB}`
	}
});

setUpPaginator(db);

export const initDb = () => {
	db.schema.hasTable('users').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('users', (table) => {
					table
						.uuid('id')
						.primary()
						.unique();
					table
						.string('email')
						.unique()
						.notNullable();
					table.string('hash').notNullable();
					table.timestamp('createdAt').defaultTo(db.fn.now());
				})
				.then(() => console.log('table created'));
		} else {
			// console.log('users already exists');
		}
	});

	db.schema.hasTable('images').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('images', (table) => {
					table
						.uuid('id')
						.primary()
						.unique();
					table.string('url');
					table.string('secureUrl');
					table.string('title');
					table.string('height');
					table.string('width');
					table.string('format');
					table.bigInteger('views');
					table.timestamp('createdAt').defaultTo(db.fn.now());
					table.uuid('authorId').references('users.id');
					table.string('authorToken');
				})
				.then(() => console.log('images created'));
		}
		// console.log('images already exists');
	});
};

export default db;
