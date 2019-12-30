import * as Knex from 'knex';

/**
 * Adds a column to a table if it does not already exist.
 *
 * @param knex Knex instance.
 * @param tableName Name of table to update.
 * @param columnName Name of column to add.
 * @param callback Callback to invoke with table builder for updating table.
 */
export async function addColumn(
  knex: Knex,
  tableName: string,
  columnName: string,
  callback: (builder: Knex.CreateTableBuilder) => any
): Promise<void> {
  if (await knex.schema.hasColumn(tableName, columnName)) {
    return;
  }
  await knex.schema.table(tableName, callback);
}
