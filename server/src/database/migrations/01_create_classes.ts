import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        table.integer('user_id').notNullable().references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        /* caso o professor seja deletado da plataforma, todas as aulas 
        relacionadas a ele serão deletadas*/
        .onDelete('CASCADE');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}