import initSqlJs from "sql.js";

export async function initDB() {
  const SQL = await initSqlJs({
    // ✅ ПРОВЕРЕННЫЕ CDN (работают в 2026)
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  try {
    // Загружаем ВАШ init.sql
    const response = await fetch("/init.sql");
    const sqlContent = await response.text();

    const db = new SQL.Database();
    db.run(sqlContent); // Выполняем ваш дамп
    console.log("✅ БД создана из init.sql");
    return db;
  } catch (error) {
    console.warn("init.sql не найден:", error);
    // Fallback: пустая БД
    const db = new SQL.Database();
    db.run(`
      CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT);
      INSERT INTO movies VALUES (1, 'Демо фильм');
    `);
    return db;
  }
}
