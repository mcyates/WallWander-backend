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

export const initDb = async () => {
	await db.schema.hasTable('users').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('users', (table) => {
					table
						.string('id')
						.primary()
						.unique();
					table
						.string('email')
						.unique()
						.notNullable();
					table.integer('uploads');
					table.string('name');
					table.string('hash').notNullable();
					table
						.boolean('nsfw')
						.notNullable()
						.defaultTo(false);
					table.timestamp('createdAt').defaultTo(db.fn.now());
				})
				.then(() => console.log('table created'));
		}
	});

	await db.schema.hasTable('images').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('images', (table) => {
					table
						.string('id')
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
						.string('authorId')
						.references('users.id')
						.notNullable();
				})
				.then(() => console.log('images created'));
		}
	});

	await db.schema.hasTable('favorites').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('favorites', (table) => {
					table
						.string('userId')
						.references('users.id')
						.onDelete('CASCADE')
						.notNullable();
					table
						.string('imageId')
						.references('images.id')
						.onDelete('CASCADE')
						.notNullable();
					table.primary(['imageId', 'userId']);
				})
				.then(() => console.log('favorites created'));
		}
	});

	await db.schema.hasTable('tags').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('tags', (table) => {
					table
						.string('id')
						.primary()
						.unique()
						.notNullable();
					table
						.string('tag')
						.unique()
						.notNullable();
					table
						.boolean('nsfw')
						.notNullable()
						.defaultTo(false);
				})
				.then(() => console.log('tags created'));
		}
	});

	await db.schema.hasTable('images_tags').then((exists) => {
		if (!exists) {
			db.schema
				.createTable('images_tags', (table) => {
					table
						.string('imageId')
						.references('images.id')
						.onDelete('CASCADE')
						.notNullable();
					table
						.string('tagId')
						.references('tags.id')
						.notNullable();
					table.primary(['imageId', 'tagId']);
				})
				.then(() => console.log('images-tags created'));
		}
	});
};

export default db;
