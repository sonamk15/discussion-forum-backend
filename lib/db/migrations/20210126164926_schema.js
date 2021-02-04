exports.up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('profile').nullable();
        table.string('email').notNullable().unique();
        table.string('password').nullable();
        table.datetime('createdAt').notNullable();
    });

    await knex.schema.createTable('queries', (table) => {
        table.increments('id');
        table.string('issue').notNullable();
        table.integer('like').nullable();
        table.string('topic').notNullable();
        table.integer('userId').unsigned().references('id').inTable('users').notNullable();
        table.datetime('createdAt').notNullable();
    });

    await knex.schema.createTable('comments', (table) => {
        table.increments('id');
        table.string('comment').notNullable();
        table.integer('like').nullable();
        table.integer('dislike').nullable();
        table.integer('queryId').unsigned().references('id').inTable('queries').notNullable();
        table.integer('userId').unsigned().references('id').inTable('users').notNullable();
        table.datetime('createdAt').notNullable();
    });

    await knex.schema.createTable('technologies', (table) => {
        table.increments('id');
        table.string('topic').notNullable();
    });
};

exports.down = async (knex) => {
    return await knex.schema.dropTable('technologies').dropTable('comments').dropTable('queries')
      .dropTable('users');
};