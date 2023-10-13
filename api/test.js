const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");

    const db = client.db("your_db_name");
    
    // Создаем коллекцию (например, "myCollection")
    const collection = db.collection("myCollection");

    // Добавляем документ (запись) в коллекцию
    const document = {
      name: "John",
      age: 30,
      email: "john@example.com"
    };

    const result = await collection.insertOne(document);
    console.log("Inserted document with _id:", result.insertedId);

    // Пример вывода имени базы данных
    console.log("Connected to database:", db.databaseName);

    // Важно закрыть соединение с базой данных, когда оно больше не нужно
    await client.close();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

// Вызываем функцию для подключения к базе данных
connectToDatabase();