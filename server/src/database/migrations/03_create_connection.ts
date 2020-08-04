import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
       
        table.integer('user_id').notNullable().references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        /* caso o professor seja deletado da plataforma, todas as conexões
        relacionadas a ele serão deletadas*/
        .onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}