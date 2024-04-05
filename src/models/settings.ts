import mongoose, { Document } from 'mongoose';

interface Settings {
    styles: Array<{ name: string; value: string; url: string }>;
    sizes: Array<{ name: string; value: string; url: string }>;
}

interface SettingsModel extends Settings, Document {}

// Определяем схему вложенного объекта
const nestedSchema = new mongoose.Schema({
    name: String,
    value: String,
    url: String,
});

const settingsSchema = new mongoose.Schema({
    styles: {
        type: [nestedSchema],
        required: true,
    },
    sizes: {
        type: [nestedSchema],
        required: true,
    },
});
const Settings = mongoose.model<SettingsModel>('settings', settingsSchema);

export default Settings;
