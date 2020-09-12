const mongoose = require('mongoose');
const Role = require('../../models/role');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true,})
    .then(async () => {
        try {
            let waitress;
            let admin;
            let chef;
            const roleWaitressExists = await Role.findOne({name: 'Waitress'});
            const roleAdminExists = await Role.findOne({name: 'Administrator'});
            const roleChefExists = await Role.findOne({name: 'Chef'});
            const userAdminExists = await User.findOne({username: 'admon'});
            if (!roleWaitressExists) {
                waitress = new Role({
                    name: 'Waitress'
                });
                await waitress.save();
            } else {
                console.log('Waitress role already exists.');
            }

            if (!roleAdminExists) {
                admin = new Role({
                    name: 'Administrator'
                });
                await admin.save();
            } else {
                console.log('Administrator role already exists.')
            }
            if (!roleChefExists) {
                chef = new Role({
                    name: 'Chef'
                });
                await chef.save();
            } else {
                console.log('Chef role already exists.');
            }

            // creating administrator user
            if (!userAdminExists) {
                const password = await bcrypt.hash('admon', 12);
                if (roleAdminExists) {
                    admin = roleAdminExists;
                }
                const admonUser = new User({
                    username: 'admon',
                    email: 'admon@gmail.com',
                    firstName: 'Manolo',
                    lastName: 'Gonzalez',
                    password: password,
                    role: {
                        role_id: admin,
                        name: admin.name
                    }
                });
                await admonUser.save();
            } else {
                console.log('Administrator user already exists.');
            }

        } catch (err) {
            console.log('Something went wrong: ', err);
        } finally {
            mongoose.connection.close();
        }
        // creating roles

    });
