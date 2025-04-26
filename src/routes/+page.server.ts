import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const phoneNumber = formData.get('phone');
		console.log('User phone number:', phoneNumber);
		return { success: true };
	}
} satisfies Actions;