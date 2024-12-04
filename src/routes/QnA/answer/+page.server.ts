import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (!password) {
            return fail(400, { missing: true });
        }

        if (password !== ADMIN_PASSWORD) {
            return fail(400, { incorrect: true });
        }

        // return some DB shit here. 
        return { success: true };
    },

    answerQuestion: async ({ request }) => {
        const data = await request.formData();
        const question = data.get('question');
        console.log(question);
    },


    deleteQuestion: async ({ request }) => {
        const data = await request.formData();
        const question = data.get('question');
        console.log(question);
    }
} satisfies Actions;
