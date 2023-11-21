import {fail, redirect} from "@sveltejs/kit";
import {ObjectId} from "mongodb";
import {encryptPassword} from "$lib/server/utility";
import DatabaseAccount from "$lib/server/databaseObjects/DatabaseAccount";

interface PasswordResetToken {
    password_reset_token: string;
}

let _id: ObjectId;

export const load = async ({params}: any) => {
    const reset_password_token = params.password_reset_token;

    const response = await DatabaseAccount.getResetPasswordToken(reset_password_token);

    if (!response.success) throw redirect(307, "/")

    const id = response._id
    _id = new ObjectId(id)

}

export const actions = {
    default: async ({request}: any) => {
        const form = await request.formData();

        const newPassword = form.get("newPassword");
        const confirmPassword = form.get("confirmPassword");

        const saltedPassword = encryptPassword(newPassword)

        if (newPassword !== confirmPassword) return fail(401, {passwordMatch: false});

        const update = await DatabaseAccount.updatePassword(_id, saltedPassword)

        if (!update) return fail(401, {success: false});

        await DatabaseAccount.deleteResetPasswordToken(_id)

        return {success: true}

    }
}