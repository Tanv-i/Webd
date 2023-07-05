const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'weatherApp';

// Create a new weather document
const createWeather = async (weatherData) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const weatherCollection = db.collection('weather');

        // Insert the weather data into the collection
        const result = await weatherCollection.insertOne(weatherData);
        console.log('Weather document created:', result.insertedId);
    } catch (err) {
        console.error('Error creating weather document:', err);
    } finally {
        client.close();
    }
};

// Read weather data
const getWeather = async () => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const weatherCollection = db.collection('weather');

        // Find all weather documents
        const weatherData = await weatherCollection.find().toArray();
        console.log('Weather data:', weatherData);
    } catch (err) {
        console.error('Error retrieving weather data:', err);
    } finally {
        client.close();
    }
};

// Update a weather document
const updateWeather = async (id, updatedData) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const weatherCollection = db.collection('weather');

        // Update the weather document
        const result = await weatherCollection.updateOne({ _id: id }, { $set: updatedData });
        console.log('Weather document updated:', result.modifiedCount);
    } catch (err) {
        console.error('Error updating weather document:', err);
    } finally {
        client.close();
    }
};

// Delete a weather document
const deleteWeather = async (id) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const weatherCollection = db.collection('weather');

        // Delete the weather document
        const result = await weatherCollection.deleteOne({ _id: id });
        console.log('Weather document deleted:', result.deletedCount);
    } catch (err) {
        console.error('Error deleting weather document:', err);
    } finally {
        client.close();
    }
};

// Usage examples
const weatherData1 = { city: 'New York', temperature: 25 };
const weatherData2 = { city: 'London', temperature: 20 };

createWeather(weatherData1);
createWeather(weatherData2);

getWeather();

const updatedData = { temperature: 30 };
updateWeather('<document_id>', updatedData);

deleteWeather('<document_id>');
