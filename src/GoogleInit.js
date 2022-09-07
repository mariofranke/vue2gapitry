export const SignUpUser = async () => {
	const scopes = "https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/calendar.readonly  https://www.googleapis.com/auth/admin.reports.audit.readonly  https://www.googleapis.com/auth/admin.reports.usage.readonly"
	const client = window.google.accounts.oauth2.initTokenClient({
		client_id: '1003950224550-uihmc2sq1q23obtptdfn7tcm8p4ts6a5.apps.googleusercontent.com',
		scope: scopes,
		callback: "", // defined at request time
	});
	const tokenResponse = await new Promise((resolve, reject) => {
		try {
			// Settle this promise in the response callback for requestAccessToken()
			client.callback = (resp) => {
				if (resp.error !== undefined) {
					reject(resp);
				}

				// console.log("client resp",resp);
				resolve(resp);
			};
			// console.log("client",client);
			client.requestAccessToken({ prompt: "consent" });
		} catch (err) {
			console.log(err);
		}
	});
	return tokenResponse;
};
