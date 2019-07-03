import { db } from './../index';

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
				table.string('name').notNullable();
				table.string('password').notNullable();
				table.timestamp('createdAt').defaultTo(db.fn.now());
			})
			.then(() => console.log('table created'));
	} else {
		console.log('users already exists');
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
				table.string('title');
				table.string('resolution');
				table.bigInteger('views');
				table.timestamp('createdAt').defaultTo(db.fn.now());
				table.uuid('authorId').references('users.id');
			})
			.then(() => console.log('images created'));
	}
	console.log('images already exists');
});
