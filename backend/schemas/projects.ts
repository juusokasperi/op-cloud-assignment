export const projectsSchema = {
	tags: ['Projects'],
	summary: 'Fetch projects from backend',
	response: {
		200: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					title: { type: 'string' },
					description: { type: 'string' },
					languages: {
						type: 'array',
						items: {
							type: 'string',
							enum: ['C', 'CPP', 'REACT', 'TS'],
						},
					},
					technologies: {
						anyOf: [
							{
								type: 'array',
								items: {
									type: 'string'
								},
							},
							{ type: 'null' },
						],
					},
					gitHubUrl: {
						anyOf: [
							{ type: 'string' },
							{ type: 'null' },
						],
					},
					liveUrl: {
						anyOf: [
							{ type: 'string' },
							{ type: 'null' },
						],
					},
					image: {
						anyOf: [
							{ type: 'string' },
							{ type: 'null' },
						],
					},
				},
			},
		},
		500: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};
