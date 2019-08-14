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
					table.integer('uploads');
					table.string('name');
					table.string('hash').notNullable();
					table.timestamp('createdAt').defaultTo(db.fn.now());
				})
				.then(() => console.log('table created'));
		}
	});

	db.schema.hasTable('images').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('images', (table) => {
					table
						.uuid('id')
						.primary()
						.unique()
						.notNullable();
					table.string('url').notNullable();
					table.string('secureUrl').notNullable();
					table.string('title');
					table.string('height');
					table.string('width');
					table.string('format');
					table
						.boolean('nsfw')
						.notNullable()
						.defaultTo(false);
					table
						.bigInteger('views')
						.notNullable()
						.defaultTo(0);
					table.timestamp('createdAt').defaultTo(db.fn.now());
					table
						.uuid('authorId')
						.references('id')
						.inTable('users')
						.notNullable();
				})
				.then(() => console.log('images created'));
		}
	});

	db.schema.hasTable('favorites').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('favorites', (table) => {
					table
						.uuid('userId')
						.references('users.id')
						.notNullable();
					table
						.uuid('imageId')
						.references('images.id')
						.notNullable();
					table.primary(['imageId', 'userId']);
				})
				.then(() => console.log('favorites created'));
		}
	});
};

export default db;
