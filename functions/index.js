const sendGrid = require('@sendgrid/mail');
const functions = require('firebase-functions');
const { debug } = require("firebase-functions/lib/logger");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const apiKey = functions.config().sendgrid.key;
const adminTemplate = functions.config().sendgrid.admintemplate;
const userTemplate = functions.config().sendgrid.usertemplate;

const EC_FROM = 'sales.expresscarwash@gmail.com';
const EC_ORDER = 'orders@expresscarwash.com';
// const EC_ORDER = 'gll46960@ucmo.edu'
const EC_ADMIN_SUBJECT = 'New Order';
const EC_USER_SUBJECT = 'Order Confirmation';
const EC_ADMIN_TEXT = 'You have received a new order from %s';

sendGrid.setApiKey(apiKey);

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth()
        .getUserByEmail(data.email)
        .then((user) => {
            return admin.auth()
                .setCustomUserClaims(user.uid, {
                    admin: true
                });
        })
        .then(() => {
            return {
                message: 'success user has been made admin'
            }
        })
        .catch(error => {
            return error
        })
});

exports.sendAutoMail = functions.firestore.document('orders/{orderId}')
    .onCreate(async (change, context) => {
        const orderSnap = await db.collection('orders')
            .doc(context.params.orderId)
            .get();
        const order = orderSnap.data();

        const userSnap = await db.collection('users')
            .doc(order.email)
            .get();
        const user = userSnap.data();

        let items = [];
        for (let i = 0; i < order.items.length; i++) {
            const item = order.items[i];
            const partSnap = await db.collection('parts')
                .doc(item.itemId)
                .get();
            const part = { ...partSnap.data(), amount: item.amount };
            debug(part);
            items.push(part);
        }

        const userMsg = {
            to: order.email,
            from: EC_FROM,
            templateId: userTemplate,
            dynamic_template_data: {
                subject: EC_USER_SUBJECT,
                name: user.first,
                items: items,
                phoneNumber: user.locationPhone,
                address: user.address,
                city: user.city,
                state: user.state,
                zip: user.zip,
            },
        };

        const adminText = EC_ADMIN_TEXT.replace("%s", order.nickName);
        const adminMsg = {
            to: EC_ORDER,
            from: EC_FROM,
            templateId: adminTemplate,
            dynamic_template_data: {
                subject: EC_ADMIN_SUBJECT,
                text: adminText,
                items: items,
                comment: order.comment
            },
        };

        const userMessage = await sendGrid.send(userMsg);
        debug(userMessage);
        const adminMessage = await sendGrid.send(adminMsg);
        debug(adminMessage);

        return { userMessage: userMessage, adminMessage: adminMessage };
    });

exports.createNewUser = functions.https.onCall((data) => {
    let disabled = true;
    if (data.isAdmin) {
        disabled = false;
    }
    admin.auth()
        .createUser({
                        email: data.email,
                        emailVerified: true,
                        password: data.password,
                        disabled: disabled,
                    })
        .then((userRecord) => {
            debug('Successfully created new user:', userRecord.uid);
            return Promise.resolve('success');
        })
        .catch((error) => {
            debug('Error creating new user:', error);
            return Promise.reject(error);
        });
});

exports.deleteUser = functions.https.onCall(async (data) => {
    debug("Attempting to delete user with email:", data.email);
    const userRecord = await admin.auth()
        .getUserByEmail(data.email)
        .catch(error => {
            debug('Error getting user record:', error);
            return error;
        });
    debug(userRecord);
    const uid = userRecord.uid;

    await admin.auth()
        .deleteUser(uid)
        .catch(error => {
            debug('Error deleting user:', error);
            return error;
        });
    debug('Successfully deleted user:', uid);
    await db.collection("users")
        .doc(data.email)
        .delete()
        .catch(error => {
            debug('Error deleting user doc:', error);
            return error;
        });
    debug('Successfully deleted user doc:', uid);
    return 'success';
});

exports.updateUserApproval = functions.https.onCall((data, context) => {
    admin.auth()
        .getUserByEmail(data.email)
        .then((userRecord) => {
            admin.auth()
                .updateUser(userRecord.uid, {
                    disabled: data.disabled,
                })
                .then((userRecord) => {
                    debug('Successfully updated user approval to:', data.disabled);
                    return 'success';
                })
                .catch((error) => {
                    debug('Error setting user approval:', error);
                    return error;
                });
        })
        .catch((error) => {
            debug('Error setting user approval:', error);
            return error;
        });
});
