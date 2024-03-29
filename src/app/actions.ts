"use server"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {db} from "@/db";
import {passwords, PasswordType} from "@/db/schema";
import {eq} from "drizzle-orm";
import CryptoJS from 'crypto-js';
import {revalidateTag, unstable_cache as cache} from "next/cache";

const key = process.env.KEY_STRING!


export async function createPassword(data:Partial<PasswordType>) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return {error:"User not found"};
    }

    await db.insert(passwords).values(
        {
            platform: data.platform!,
            email: data.email!,
            password: CryptoJS.AES.encrypt(data.password!, key).toString(),
            userId: user.id
        }
    )
}

export async function getPasswords():Promise<PasswordType[]> {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return Promise.reject({ status: 401, error: "User not found" });
    }

    const data = await db.select().from(passwords)
        .where(eq(passwords.userId, user.id))

    data.forEach(i=>
        i.password=CryptoJS.AES.decrypt(i.password, key)
            .toString(CryptoJS.enc.Utf8))

    return data
}

export async function getPassword(id:number) : Promise<PasswordType | null> {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return Promise.reject({ status: 401, error: "User not found" });
    }
    const pass  = await db.select().from(passwords).where(eq(passwords.id, id))

    if(pass.length===0)
    {
        return null;
    }
    pass[0].password=CryptoJS.AES.decrypt(pass[0].password, key)
        .toString(CryptoJS.enc.Utf8)

    return pass[0]

}

export async function updatePassword(data:Partial<PasswordType>) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user || !data.id ) {
        return Promise.reject({ status: 404, error: "User not found" });
    }

    if (data.userId !== user.id){
        return Promise.reject({ status: 401, error: "Unauthorized" });
    }
    await db.update(passwords).set({...data,password:CryptoJS.AES.encrypt(data.password!, key).toString()}).where(eq(passwords.id, data.id))
}

export async function deletePassword(id:number) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return Promise.reject({ status: 401, error: "User not found" });
    }
    await db.delete(passwords).where(eq(passwords.id, id))

}