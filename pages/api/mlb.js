// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	try {
		let response = await fetch('https://jsonodds.com/api/odds/mlb', {
			headers: {
				'x-api-key': process.env.APIKEY,
			},
		});
		response = await response.json();
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ msg: `Internal Server Error.` });
	}
}
