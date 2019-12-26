import { getAdmin, authorize, authenticate, changePassword } from '../services/authService';
import { initDatabase } from '../services/dbService';
import config from '../config';

test('get_admin_account', async () => {
    let admin = await getAdmin();
    let properties = Object.keys(admin);
    expect(properties.includes("login")).toBeTruthy();
    expect(properties.includes("password")).toBeTruthy();
    expect(admin.login).toEqual("Admin");
});

test('successfull_authorize', async () => {
    await initDatabase();
    let jwt = await authorize(config.password);
    expect(typeof jwt).toBe("string");
});

test("failed_authorize", async () => {
    try {
        await authorize(randomString());
    }
    catch(e) {
        expect(e.message).toEqual("Invalid password");
    }
});

test('authenticate', async () => {
    await initDatabase();
    let jwt = await authorize(config.password);
    let authenticated = await authenticate(jwt);
    expect(authenticated).toBeTruthy();
});

test('change_password', async () => {
    let success = await changePassword("Admin");
    expect(success).toBeTruthy();
});

function randomString() {
    return Math.random().toString(36).substring(2, 15);
}