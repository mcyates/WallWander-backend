"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
exports.db = knex_1.default({
    client: 'pg',
    connection: {
        host: `${process.env.POSTGRES_HOST}`,
        user: `${process.env.POSTGRES_USER}`,
        password: `${process.env.POSTGRES_PASSWORD}`,
        database: `${process.env.POSTGRES_DB}`
    }
});
exports.initDb = () => {
    exports.db.schema.hasTable('users').then((exists) => {
        if (!exists) {
            exports.db.schema
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
                table.timestamp('createdAt').defaultTo(exports.db.fn.now());
            })
                .then(() => console.log('table created'));
        }
        else {
        }
    });
    exports.db.schema.hasTable('images').then((exists) => {
        if (!exists) {
            exports.db.schema
                .createTable('images', (table) => {
                table
                    .uuid('id')
                    .primary()
                    .unique();
                table.string('url');
                table.string('title');
                table.string('resolution');
                table.bigInteger('views');
                table.timestamp('createdAt').defaultTo(exports.db.fn.now());
                table.uuid('authorId').references('users.id');
            })
                .then(() => console.log('images created'));
        }
    });
};
exports.default = exports.db;
