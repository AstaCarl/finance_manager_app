import { UserDto } from "./UserDto";

export class UserAPI {

    static baseUrl = 'http://10.59.169.159:3000/auth/';

    static async signup(userDto: UserDto) {
        console.log("calling " + UserAPI.baseUrl + "signup");
        // console.log("request payload", newUser);


        const response = await fetch(UserAPI.baseUrl + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto),
        });
        const data = await response.json();
        return data;
    }

    static async login(userDto: UserDto) {
        console.log("calling " + UserAPI.baseUrl + "login");
        // console.log("request payload", newUser);

        const response = await fetch(UserAPI.baseUrl + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto),
        });
        const data = await response.json();
        return data;
    }
}