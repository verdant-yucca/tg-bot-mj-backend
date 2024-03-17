import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface AdminUser {
    login: string;
    password: string;
}

interface AdminUserModel extends AdminUser, Document {}

const adminUserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const AdminUser = mongoose.model<AdminUserModel>('adminUser', adminUserSchema);

export default AdminUser;
